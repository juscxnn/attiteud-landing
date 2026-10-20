import Mark from "../components/Mark";
import Reveal from "../components/Reveal";
import SectionIndex from "../components/SectionIndex";

export default function Company() {
  return (
    <section
      id="company"
      className="section section-bone company"
      aria-labelledby="company-title"
    >
      <div className="container">
        <Reveal>
          <SectionIndex number="04" label="Company" />
        </Reveal>

        <div className="company-grid">
          <div className="company-content">
            <Reveal>
              <h2 id="company-title" className="section-title company-title">
                Independent. Built to operate
                <span className="signal">.</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="company-copy">
                <p className="lede">
                  Attiteud is a privately held technology company. We design,
                  build, and operate agentic systems — and the companies that
                  grow from them.
                </p>
                <p>
                  We don't sell time. We build, own, and operate what we make.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="company-mark-wrap">
            <Mark className="company-mark" />
          </Reveal>
        </div>

        <Reveal>
          <dl className="company-facts">
            <div>
              <dt>Ownership</dt>
              <dd>Privately held</dd>
            </div>
            <div>
              <dt>Model</dt>
              <dd>Build, own, operate</dd>
            </div>
            <div>
              <dt>First public venture</dt>
              <dd>Gatekeep</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
