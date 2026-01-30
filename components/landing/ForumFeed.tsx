import { getLatestTopics } from '@/lib/discourse';
import { ForumTopicCard } from './ForumTopicCard';
import { siteConfig } from '@/data/site';

export async function ForumFeed() {
  const topics = await getLatestTopics(8);

  // Hide section if API fails
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[001]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide">
            COMMUNITY DISCUSSIONS
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm">
            Join the conversation. Discuss hashrate heating projects, share ideas, connect with builders.
          </p>
        </div>

        {/* Topics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {topics.map((topic) => (
            <ForumTopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        {/* View all link */}
        <a
          href={siteConfig.links.forum}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
        >
          <span>&gt;</span>
          VIEW ALL DISCUSSIONS
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
