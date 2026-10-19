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
            <span className="hero-title-sans">Systems for</span>{" "}
            <span className="hero-title-serif">
              what comes next<span className="accent">.</span>
            </span>
          </h1>

          <div className="hero-copy">
            <p>
              Attiteud is an independent technology company building intelligent
              software, infrastructure, and businesses for an increasingly complex
              world.
            </p>
          </div>
        </div>

        <div className="hero-foot">
          <span className="mono-micro hero-domains">
            Intelligence / Infrastructure / Ventures
          </span>
          <a href="#company" className="scroll-cue">
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
