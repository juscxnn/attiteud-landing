import RelayFigure from "../components/RelayFigure";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

export default function Venture() {
  return (
    <section
      id="ventures"
      className="section venture"
      aria-labelledby="venture-title"
    >
      <div className="venture-glow" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionLabel number="03" label="Gatekeep" />
        </Reveal>

        <div className="venture-grid">
          <Reveal>
            <div className="venture-copy">
              <h2 id="venture-title" className="venture-name">
                Gatekeep
              </h2>
              <p className="venture-descriptor">
                An AI-native operating system for venture.
              </p>
              <p className="venture-description">
                Founders build their case. Investors qualify inbound and
                discover relevant companies. Every conversation adds to one
                record that compounds.
              </p>
              <a
                className="arrow-link"
                href="https://gatekeep.vc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Gatekeep <span aria-hidden="true">↗</span>
              </a>
              <p className="venture-note">Developed and operated by Attiteud.</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="venture-figure">
              <RelayFigure intensity={0.85} />
              <div className="venture-caption">
                <span className="venture-caption-dot" aria-hidden="true" />
                <span>Shared record / Live system</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
