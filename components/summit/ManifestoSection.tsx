export function ManifestoSection() {
  return (
    <section className="bg-[var(--background)] pt-16 pb-0 text-center">
      <div className="section-container pb-16">
        <p className="m-0">
          <span className="block font-mono text-sm md:text-xl font-bold tracking-wider leading-loose text-[var(--foreground)]">
            UNDERMINE THE STATUS QUO.
          </span>
          <span className="block font-mono text-sm md:text-xl font-bold tracking-wider leading-loose text-[var(--accent)] animate-text-glow">
            THE FUTURE OF BITCOIN MINING IS AT HOME.
          </span>
        </p>
      </div>

      {/* Animated flame bar */}
      <div className="flame-bar" />
    </section>
  );
}
