import type {
  DiscourseLatestResponse,
  DiscourseCategoriesResponse,
  DiscourseTopicDetailResponse,
  ForumTopic,
  ForumImage
} from '@/types/discourse';

const DISCOURSE_URL = process.env.DISCOURSE_URL || 'https://forum.heatpunks.org';

// Helper to build topic URL
const getTopicUrl = (slug: string, id: number) => `${DISCOURSE_URL}/t/${slug}/${id}`;

// Helper to build Discourse API headers
function getDiscourseHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Accept': 'application/json' };
  if (process.env.DISCOURSE_API_KEY && process.env.DISCOURSE_API_USERNAME) {
    headers['Api-Key'] = process.env.DISCOURSE_API_KEY;
    headers['Api-Username'] = process.env.DISCOURSE_API_USERNAME;
  }
  return headers;
}

// Validate Discourse API response structure
function isValidDiscourseResponse(data: any): data is DiscourseLatestResponse {
  return (
    data &&
    typeof data === 'object' &&
    data.topic_list &&
    typeof data.topic_list === 'object' &&
    Array.isArray(data.topic_list.topics)
  );
}

// Fetch with retry logic and exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 2
): Promise<Response> {
  // Disable retries in test environment for faster tests
  const isTest = process.env.NODE_ENV === 'test';
  const maxRetries = isTest ? 0 : retries;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      // If successful, return immediately
      if (response.ok) {
        return response;
      }

      // If it's the last attempt or a client error (4xx), don't retry
      if (attempt === maxRetries || (response.status >= 400 && response.status < 500)) {
        return response;
      }

      // Wait with exponential backoff before retrying (1s, 2s, 4s...)
      const delay = 1000 * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));

    } catch (error) {
      // If it's the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Wait with exponential backoff before retrying
      const delay = 1000 * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript requires it
  throw new Error('Failed to fetch after retries');
}

// Fetch topic details and extract images from all posts (including replies)
async function getTopicImages(topicId: number, topicTitle: string, topicSlug: string): Promise<string[]> {
  try {
    const response = await fetchWithRetry(`${DISCOURSE_URL}/t/${topicId}.json`, {
      headers: getDiscourseHeaders(),
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return [];
    }

    const topic: DiscourseTopicDetailResponse = await response.json();

    // Validate response structure
    if (!topic.post_stream || !Array.isArray(topic.post_stream.posts)) {
      return [];
    }

    const images: string[] = [];

    // Extract images from all posts (including replies)
    for (const post of topic.post_stream.posts) {
      if (!post.cooked) continue;

      // Match all img tags and extract src attributes
      const imgMatches = post.cooked.match(/<img[^>]+src=["']([^"'>]+)["'][^>]*>/g);
      if (imgMatches) {
        for (const imgTag of imgMatches) {
          const srcMatch = imgTag.match(/src=["']([^"'>]+)["']/);
          if (srcMatch && srcMatch[1]) {
            const imgUrl = srcMatch[1];
            // Convert relative URLs to absolute
            const absoluteUrl = imgUrl.startsWith('http')
              ? imgUrl
              : `${DISCOURSE_URL}${imgUrl}`;
            images.push(absoluteUrl);
          }
        }
      }
    }

    return images;
  } catch (error) {
    console.error(`Failed to fetch images for topic ${topicId}:`, error);
    return [];
  }
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return 'unknown';
  }
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

// Unified data fetching - fetches topics and categories once, returns both topics and images
export interface DiscourseData {
  topics: ForumTopic[];
  images: ForumImage[];
}

export async function getDiscourseData(topicsLimit = 10, imagesLimit = 12): Promise<DiscourseData | null> {
  try {
    const headers = getDiscourseHeaders();

    // Fetch topics and categories in parallel with retry logic
    const [topicsResponse, categoriesResponse] = await Promise.all([
      fetchWithRetry(`${DISCOURSE_URL}/latest.json`, {
        headers,
        next: { revalidate: 300 }, // Cache for 5 minutes
      }),
      fetchWithRetry(`${DISCOURSE_URL}/categories.json`, {
        headers,
        next: { revalidate: 3600 }, // Cache categories for 1 hour
      }),
    ]);

    if (!topicsResponse.ok) {
      console.error(`Discourse API error: ${topicsResponse.status}`);
      return null;
    }

    const data: DiscourseLatestResponse = await topicsResponse.json();

    // Validate response structure
    if (!isValidDiscourseResponse(data)) {
      console.error('Invalid Discourse response structure:', data);
      return null;
    }

    // Build category map from categories response
    let categoryMap: Record<number, string> = {};
    if (categoriesResponse.ok) {
      const categoriesData: DiscourseCategoriesResponse = await categoriesResponse.json();
      categoryMap = Object.fromEntries(
        categoriesData.category_list.categories.map(cat => [cat.id, cat.name])
      );
    }

    // Transform to topics format
    try {
      const topics: ForumTopic[] = data.topic_list.topics
        .slice(0, topicsLimit)
        .map((topic) => ({
          id: topic.id,
          title: topic.fancy_title || topic.title,
          excerpt: topic.excerpt || '',
          category: categoryMap[topic.category_id] || 'General',
          url: getTopicUrl(topic.slug, topic.id),
          timeAgo: getTimeAgo(topic.last_posted_at || topic.created_at),
        }));

      // Transform to images format (filter topics with images)
      // First pass: get images from topics with image_url (fast)
      const images: ForumImage[] = data.topic_list.topics
        .filter((topic) => topic.image_url)
        .slice(0, imagesLimit)
        .map((topic) => ({
          id: topic.id,
          url: topic.image_url!.startsWith('http')
            ? topic.image_url!
            : `${DISCOURSE_URL}${topic.image_url}`,
          topicTitle: topic.fancy_title || topic.title,
          topicUrl: getTopicUrl(topic.slug, topic.id),
        }));

      // Second pass: if we need more images, fetch from topics without image_url
      // Limit to 5 additional API calls to balance coverage vs. performance
      if (images.length < imagesLimit) {
        const topicsWithoutImages = data.topic_list.topics
          .filter((topic) => !topic.image_url)
          .slice(0, 5); // Max 5 additional API calls

        for (const topic of topicsWithoutImages) {
          if (images.length >= imagesLimit) break; // Stop if we have enough images

          const replyImages = await getTopicImages(
            topic.id,
            topic.fancy_title || topic.title,
            topic.slug
          );

          // Add first image from replies if available
          if (replyImages.length > 0) {
            images.push({
              id: topic.id,
              url: replyImages[0],
              topicTitle: topic.fancy_title || topic.title,
              topicUrl: getTopicUrl(topic.slug, topic.id),
            });
          }
        }
      }

      return { topics, images };
    } catch (processingError) {
      console.error('Error processing Discourse data:', processingError);
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch Discourse data:', error);
    return null;
  }
}

// Legacy functions for backward compatibility and independent usage
export async function getLatestTopics(limit = 10): Promise<ForumTopic[] | null> {
  const data = await getDiscourseData(limit, 0);
  return data?.topics ?? null;
}

export async function getTopicsWithImages(limit = 12): Promise<ForumImage[] | null> {
  const data = await getDiscourseData(0, limit);
  return data?.images ?? null;
}
