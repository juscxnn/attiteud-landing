import AgentField from "../components/AgentField";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="signal-dot" aria-hidden="true" />
            Independent technology company
          </p>

          <h1 id="hero-title" className="hero-title">
            Software
            <br />
            that acts<span className="signal">.</span>
          </h1>

          <div className="hero-lower">
            <p className="hero-sub">
              Attiteud builds agentic systems — intelligence with memory,
              tools, and intent — and the infrastructure to operate them.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#systems">
                Explore the systems <span aria-hidden="true">↓</span>
              </a>
              <a className="button-quiet" href="#contact">
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <span className="mono-label">
            Intelligence / Infrastructure / Ventures
          </span>
          <span className="mono-label hero-foot-mark">
            AT / 001
          </span>
        </div>
      </div>

      <div
        className="hero-field"
        role="img"
        aria-label="A live field of autonomous agents that respond to the cursor."
      >
        <AgentField />
        <div className="field-hud field-hud-top" aria-hidden="true">
          <span>Agent field / 01</span>
          <span className="field-live">
            Live <i />
          </span>
        </div>
        <div className="field-hud field-hud-bottom" aria-hidden="true">
          <span>Move to attract</span>
          <span>Attiteud / Signal</span>
        </div>
      </div>
    </section>
  );
}
