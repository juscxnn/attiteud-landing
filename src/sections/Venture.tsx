import RelayFigure from "../components/RelayFigure";
import Reveal from "../components/Reveal";

export default function Venture() {
  return (
    <section id="ventures" className="section venture" aria-labelledby="venture-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Selected venture</p>
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
              <RelayFigure />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
