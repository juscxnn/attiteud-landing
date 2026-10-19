import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

const model = ["Identify", "Develop", "Operate"];

export default function Company() {
  return (
    <section id="company" className="section company" aria-labelledby="company-title">
      <div className="container">
        <Reveal>
          <SectionLabel index="01">Company</SectionLabel>
        </Reveal>

        <div className="company-grid">
          <Reveal>
            <h2 id="company-title" className="display company-title">
              Built on conviction.
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <div className="company-copy">
              <p className="lede">
                We identify structural problems, develop the systems to address
                them, and build businesses around opportunities with lasting
                relevance.
              </p>
              <p>We develop, own, and operate what we build.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="company-model" aria-label="Our approach">
            {model.map((step, index) => (
              <div className="model-step" key={step}>
                <span className="model-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
