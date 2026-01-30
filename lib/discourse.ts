import type { DiscourseLatestResponse, DiscourseCategoriesResponse, ForumTopic, ForumImage } from '@/types/discourse';

const DISCOURSE_URL = process.env.DISCOURSE_URL || 'https://forum.heatpunks.org';

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
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

export async function getLatestTopics(limit = 10): Promise<ForumTopic[] | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    // Add API key if configured
    if (process.env.DISCOURSE_API_KEY && process.env.DISCOURSE_API_USERNAME) {
      headers['Api-Key'] = process.env.DISCOURSE_API_KEY;
      headers['Api-Username'] = process.env.DISCOURSE_API_USERNAME;
    }

    // Fetch topics and categories in parallel
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
      categoryMap = categoriesData.category_list.categories.reduce(
        (acc, cat) => ({ ...acc, [cat.id]: cat.name }),
        {} as Record<number, string>
      );
    }

    // Transform Discourse topics to our format
    const topics: ForumTopic[] = data.topic_list.topics
      .slice(0, limit)
      .map((topic) => ({
        id: topic.id,
        title: topic.fancy_title || topic.title,
        excerpt: topic.excerpt || '',
        category: categoryMap[topic.category_id] || 'General',
        url: `${DISCOURSE_URL}/t/${topic.slug}/${topic.id}`,
        timeAgo: getTimeAgo(topic.last_posted_at || topic.created_at),
      }));

    return topics;
  } catch (error) {
    console.error('Failed to fetch Discourse topics:', error);
    return null;
  }
}

export async function getTopicsWithImages(limit = 12): Promise<ForumImage[] | null> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (process.env.DISCOURSE_API_KEY && process.env.DISCOURSE_API_USERNAME) {
      headers['Api-Key'] = process.env.DISCOURSE_API_KEY;
      headers['Api-Username'] = process.env.DISCOURSE_API_USERNAME;
    }

    const response = await fetch(`${DISCOURSE_URL}/latest.json`, {
      headers,
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      console.error(`Discourse API error: ${response.status}`);
      return null;
    }

    const data: DiscourseLatestResponse = await response.json();

    // Filter topics that have images and transform to our format
    const images: ForumImage[] = data.topic_list.topics
      .filter((topic) => topic.image_url)
      .slice(0, limit)
      .map((topic) => ({
        id: topic.id,
        url: topic.image_url!.startsWith('http')
          ? topic.image_url!
          : `${DISCOURSE_URL}${topic.image_url}`,
        topicTitle: topic.fancy_title || topic.title,
        topicUrl: `${DISCOURSE_URL}/t/${topic.slug}/${topic.id}`,
      }));

    return images;
  } catch (error) {
    console.error('Failed to fetch Discourse images:', error);
    return null;
  }
}
