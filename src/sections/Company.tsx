import Reveal from "../components/Reveal";

export default function Company() {
  return (
    <section id="company" className="section company" aria-labelledby="company-title">
      <div className="container company-grid">
        <Reveal>
          <h2 id="company-title" className="display company-title">
            Built on conviction.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="company-copy">
            <p className="lede">
              We identify structural problems, develop the systems to address
              them, and build businesses around opportunities with lasting
              relevance.
            </p>
            <p>We develop, own, and operate what we build. That alignment is the point.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
