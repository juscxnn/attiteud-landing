import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

export default function Company() {
  return (
    <section
      id="company"
      className="section paper company"
      data-header-theme="light"
      aria-labelledby="company-title"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="01" label="Company" />
        </Reveal>

        <div className="company-grid">
          <Reveal>
            <h2 id="company-title" className="display company-title">
              We build what we own<span className="accent">.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="company-copy">
              <p className="lede">
                We identify structural problems, develop the systems to address
                them, and build businesses around opportunities with lasting
                relevance.
              </p>
              <p>
                We develop, own, and operate what we build. That alignment is
                the point.
              </p>
              <div className="company-model" aria-label="Operating model">
                <span>Develop</span>
                <span>Own</span>
                <span>Operate</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
