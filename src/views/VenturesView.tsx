import { useState } from "react";
import RelayFigure from "../components/RelayFigure";

interface VenturesViewProps {
  active: boolean;
}

export default function VenturesView({ active }: VenturesViewProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section
      id="ventures"
      className={`view ventures-view${active ? " is-active" : ""}`}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="view-inner">
        <div className="view-head">
          <span className="view-label">02 / Ventures</span>
          <span className="view-label">See also</span>
        </div>

        <div className="ventures-head">
          <h2 className="view-title" data-view-heading tabIndex={-1}>
            Selected Ventures.
          </h2>
          <p className="view-note ventures-note">
            Attiteud develops and operates independent software businesses.
            Gatekeep is the first to be presented publicly.
          </p>
        </div>

        <article className="venture-card" data-details={detailsOpen}>
          <div className="venture-copy">
            <div className="venture-top">
              <span className="venture-index" aria-hidden="true">
                01
              </span>
              <span className="venture-status">
                <span className="status-dot" aria-hidden="true" />
                In operation
              </span>
            </div>

            <h3 className="venture-name">Gatekeep</h3>
            <p className="venture-descriptor">
              An AI-native operating system for venture.
            </p>

            <div className="venture-links">
              <a
                className="venture-link"
                href="https://gatekeep.vc"
                target="_blank"
                rel="noopener noreferrer"
              >
                gatekeep.vc <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                className="venture-disclosure"
                aria-expanded={detailsOpen}
                aria-controls="venture-details"
                onClick={() => setDetailsOpen((open) => !open)}
              >
                {detailsOpen ? "Close" : "Details"}
                <span className="disclosure-icon" aria-hidden="true" />
              </button>
            </div>

            {detailsOpen && (
              <div className="venture-details" id="venture-details">
                <p>
                  Gatekeep gives founders and investors a shared system for
                  building, qualifying, and discovering venture opportunities.
                  Every conversation adds to one record that compounds.
                </p>
                <p className="venture-attribution">
                  Developed and operated by Attiteud.
                </p>
                <a
                  className="venture-cta"
                  href="https://gatekeep.vc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Gatekeep <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </div>

          <div className="venture-figure">
            <div className="figure-meta">
              <span>Fig. 2</span>
              <span>Relay / 001</span>
            </div>
            <RelayFigure active={active} />
            <div className="figure-meta figure-meta-bottom">
              <span>One record / many paths</span>
              <span>Move pointer</span>
            </div>
          </div>
        </article>

        <p className="ventures-more">More in time.</p>
      </div>
    </section>
  );
}
