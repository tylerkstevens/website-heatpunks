import { GrantsForm } from './GrantsForm';

export function ApplicationSection() {
  return (
    <section id="apply" className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            SUBMIT YOUR <span className="text-[var(--accent)]">PROPOSAL</span>
          </h2>
          <p className="text-[var(--muted)] max-w-2xl">
            Tell us about your project. We review applications on a rolling basis and
            will reach out if we&apos;d like to learn more.
          </p>
        </div>

        <div className="max-w-3xl">
          <GrantsForm />
        </div>
      </div>
    </section>
  );
}
