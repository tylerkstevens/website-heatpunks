import { grantCategories } from '@/data/grants';

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[002]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            WHAT WE <span className="text-[var(--accent)]">FUND</span>
          </h2>
          <p className="text-[var(--muted)] max-w-2xl">
            These categories are suggestions, not limitations. We&apos;re open to any project
            that advances hashrate heating adoption.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grantCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[var(--card-background)] border border-[var(--card-border)] p-5 hover:border-[var(--accent)] transition-colors"
            >
              <div className="font-mono text-xs text-[var(--terminal-color)] mb-2">
                &gt; {category.id.toUpperCase().replace(/-/g, '_')}
              </div>
              <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}

          {/* Other category placeholder */}
          <div className="bg-[var(--card-background)] border border-dashed border-[var(--card-border)] p-5 flex flex-col justify-center items-center text-center">
            <div className="font-mono text-xs text-[var(--terminal-color)] mb-2">
              &gt; OTHER
            </div>
            <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-2">
              Something Else?
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Have an idea that doesn&apos;t fit these categories? We want to hear it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
