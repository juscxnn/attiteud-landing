import Reveal from "../components/Reveal";
import SectionIndex from "../components/SectionIndex";

export default function Thesis() {
  return (
    <section
      id="thesis"
      className="section section-ink thesis"
      aria-labelledby="thesis-title"
    >
      <div className="container">
        <Reveal>
          <SectionIndex number="01" label="Thesis" />
        </Reveal>

        <div className="thesis-grid">
          <Reveal>
            <h2 id="thesis-title" className="section-title thesis-title">
              The next software won't wait to be asked
              <span className="signal">.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="thesis-copy">
              <p className="lede">
                For decades, software waited for a click. Agents change the
                unit of software: systems that hold context, decide, and act
                inside the work.
              </p>
              <p>
                That shift takes more than a model. It takes memory, tools,
                permissions, evaluation, and an operating layer. Attiteud
                builds that layer.
              </p>
              <p className="thesis-note">
                <span className="signal-dot" aria-hidden="true" />
                Agency is not a model. It is an architecture.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
