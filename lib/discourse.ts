import type { DiscourseLatestResponse, DiscourseCategoriesResponse, ForumTopic, ForumImage } from '@/types/discourse';

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

    // Fetch topics and categories in parallel (single API call for topics)
    const [topicsResponse, categoriesResponse] = await Promise.all([
      fetch(`${DISCOURSE_URL}/latest.json`, {
        headers,
        next: { revalidate: 300 }, // Cache for 5 minutes
      }),
      fetch(`${DISCOURSE_URL}/categories.json`, {
        headers,
        next: { revalidate: 3600 }, // Cache categories for 1 hour
      }),
    ]);

    if (!topicsResponse.ok) {
      console.error(`Discourse API error: ${topicsResponse.status}`);
      return null;
    }

    const data: DiscourseLatestResponse = await topicsResponse.json();

    // Build category map from categories response
    let categoryMap: Record<number, string> = {};
    if (categoriesResponse.ok) {
      const categoriesData: DiscourseCategoriesResponse = await categoriesResponse.json();
      categoryMap = Object.fromEntries(
        categoriesData.category_list.categories.map(cat => [cat.id, cat.name])
      );
    }

    // Transform to topics format
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

    return { topics, images };
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
