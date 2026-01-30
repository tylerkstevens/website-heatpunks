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
  created_at: string;
  last_posted_at: string;
  category_id: number;
  posts_count: number;
  reply_count: number;
  posters: Array<{
    user_id: number;
  }>;
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

export interface ForumTopic {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  timeAgo: string;
}
