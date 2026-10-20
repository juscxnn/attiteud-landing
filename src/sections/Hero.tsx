import Asterisk from "../components/Asterisk";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <Asterisk className="hero-asterisk" />

      <div className="container hero-inner">
        <p className="hero-kicker">
          <span className="status-dot" aria-hidden="true" />
          Independent technology company
        </p>

        <div className="hero-main">
          <h1 id="hero-title" className="hero-title">
            The future is
            <br />
            built deliberately<span className="accent">.</span>
          </h1>

          <div className="hero-aside">
            <p>
              Attiteud develops, owns, and operates intelligent software,
              infrastructure, and businesses. Gatekeep is its first public
              venture.
            </p>
            <a
              className="arrow-link"
              href="https://gatekeep.vc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gatekeep <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-foot">
          <span className="mono-micro">
            Intelligence / Infrastructure / Ventures
          </span>
          <a className="scroll-cue" href="#company">
            <span>Scroll</span>
            <svg
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5.5 1V13M5.5 13L1 8.5M5.5 13L10 8.5"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
