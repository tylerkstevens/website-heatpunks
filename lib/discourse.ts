import type { DiscourseLatestResponse, ForumTopic } from '@/types/discourse';

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

    const response = await fetch(`${DISCOURSE_URL}/latest.json`, {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error(`Discourse API error: ${response.status}`);
      return null;
    }

    const data: DiscourseLatestResponse = await response.json();

    // Transform Discourse topics to our format
    const topics: ForumTopic[] = data.topic_list.topics
      .slice(0, limit)
      .map((topic) => ({
        id: topic.id,
        title: topic.fancy_title || topic.title,
        excerpt: topic.excerpt || '',
        category: 'General', // Could fetch categories separately if needed
        url: `${DISCOURSE_URL}/t/${topic.slug}/${topic.id}`,
        timeAgo: getTimeAgo(topic.last_posted_at || topic.created_at),
      }));

    return topics;
  } catch (error) {
    console.error('Failed to fetch Discourse topics:', error);
    return null;
  }
}
