import HorizonMark from "../components/HorizonMark";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-sky" />
        <div className="hero-glow" />
        <div className="hero-horizon" />
        <div className="hero-ground" />
        <div className="hero-point" />
        <div className="hero-grain" />
      </div>

      <div className="container hero-inner">
        <p className="hero-kicker">
          <HorizonMark className="hero-kicker-mark" />
          Independent technology company
        </p>

        <div className="hero-main">
          <h1 id="hero-title" className="hero-title">
            The future is
            <br />
            built deliberately<span className="accent">.</span>
          </h1>
        </div>

        <div className="hero-bottom">
          <div className="hero-intro">
            <p>
              Attiteud develops, owns, and operates intelligent software,
              infrastructure, and businesses.
            </p>
          </div>

          <div className="hero-venture">
            <span className="mono-micro">First public venture</span>
            <a
              className="hero-venture-link"
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
