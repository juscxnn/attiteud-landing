import Asterisk from "./components/Asterisk";
import OperatingDial from "./components/OperatingDial";

export default function App() {
  return (
    <div className="page">
      <header className="masthead">
        <div className="brand">
          <Asterisk className="brand-mark" />
          <span className="brand-name">attiteud</span>
        </div>
      </header>

      <main id="main" className="landing-main">
        <section className="entry" aria-labelledby="entry-title">
          <div className="entry-topline">
            <span>Entry 001</span>
            <span>English</span>
          </div>

          <h1 id="entry-title" className="entry-headword" aria-label="attiteud">
            at·ti·teud
          </h1>

          <div className="entry-pronunciation">
            <span className="entry-ipa">/at-i-tyood/</span>
            <span className="entry-pos">noun</span>
          </div>

          <div className="entry-definitions">
            <p className="entry-sense entry-sense-primary">
              <span className="entry-number" aria-hidden="true">
                1.
              </span>{" "}
              a <em>small</em> thing that makes a <em>big</em> difference
              <span className="accent">.</span>
            </p>

            <p className="entry-origin">
              <span className="entry-label">Origin</span>
              a respelling of <em>attitude</em>.
            </p>

            <p className="entry-sense entry-sense-secondary">
              <span className="entry-number" aria-hidden="true">
                2.
              </span>{" "}
              <span className="entry-label">proper noun</span>
              an independent technology company<span className="accent">.</span>
            </p>
          </div>
        </section>

        <section className="visual" aria-labelledby="model-title">
          <div className="visual-head">
            <span>Fig. 01</span>
            <h2 id="model-title">The operating model</h2>
          </div>
          <OperatingDial />
        </section>
      </main>

    </div>
  );
}
