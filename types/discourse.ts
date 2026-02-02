export interface DiscourseUser {
  id: number;
  username: string;
  avatar_template: string;
}

export interface DiscourseTopic {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  excerpt?: string;
  image_url?: string;
  created_at: string;
  last_posted_at: string;
  category_id: number;
  posts_count: number;
  reply_count: number;
  posters: Array<{
    user_id: number;
  }>;
}

export interface ForumImage {
  id: number;
  url: string;
  topicTitle: string;
  topicUrl: string;
}

export interface DiscourseCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export interface DiscourseLatestResponse {
  users: DiscourseUser[];
  topic_list: {
    topics: DiscourseTopic[];
  };
}

export interface DiscourseCategoriesResponse {
  category_list: {
    categories: DiscourseCategory[];
  };
}

export interface ForumTopic {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  timeAgo: string;
}

export interface DiscoursePost {
  id: number;
  post_number: number;
  cooked: string; // HTML content
  user_id: number;
  created_at: string;
}

export interface DiscourseTopicDetailResponse {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  post_stream: {
    posts: DiscoursePost[];
  };
}
