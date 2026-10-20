import Reveal from "../components/Reveal";
import SectionIndex from "../components/SectionIndex";
import SignalMap from "../components/SignalMap";

export default function Venture() {
  return (
    <section
      id="venture"
      className="section section-ink venture"
      aria-labelledby="venture-title"
    >
      <div className="container">
        <Reveal>
          <SectionIndex number="03" label="Venture" />
        </Reveal>

        <div className="venture-grid">
          <Reveal>
            <div className="venture-copy">
              <h2 id="venture-title" className="venture-title">
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
                className="text-link"
                href="https://gatekeep.vc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Gatekeep <span aria-hidden="true">↗</span>
              </a>
              <p className="mono-label venture-note">
                First public venture / Developed and operated by Attiteud
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="venture-map">
              <SignalMap />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
