import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

export default function Independence() {
  return (
    <section
      id="independence"
      className="section paper independence"
      data-header-theme="light"
      aria-labelledby="independence-title"
    >
      <div className="container">
        <Reveal>
          <SectionLabel number="04" label="Independence" />
        </Reveal>

        <div className="independence-grid">
          <Reveal>
            <h2 id="independence-title" className="display independence-title">
              Independent by design<span className="accent">.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="independence-copy">
              <p>
                Attiteud is privately held and built for the long term. We
                don't sell time. We build, own, and operate the systems we
                choose.
              </p>

              <dl className="ledger">
                <div>
                  <dt>Ownership</dt>
                  <dd>Privately held</dd>
                </div>
                <div>
                  <dt>Horizon</dt>
                  <dd>Long term</dd>
                </div>
                <div>
                  <dt>Model</dt>
                  <dd>Build, own, operate</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
