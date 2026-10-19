import StrataFigure from "../components/StrataFigure";
import type { ViewId } from "./types";

interface EntryViewProps {
  active: boolean;
  onNavigate: (view: ViewId) => void;
}

export default function EntryView({ active, onNavigate }: EntryViewProps) {
  return (
    <section
      id="index"
      className={`view entry-view${active ? " is-active" : ""}`}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="view-inner entry-grid">
        <div className="entry-copy">
          <div className="entry-topline">
            <span>Attiteud / Entry 001</span>
            <span>English / Est. 2025</span>
          </div>

          <h1 className="entry-headword" data-view-heading tabIndex={-1}>
            at·ti·teud
          </h1>

          <div className="entry-pronunciation">
            <span>/ˈætɪtjuːd/</span>
            <span className="entry-pos">noun</span>
          </div>

          <div className="entry-definitions">
            <div className="entry-def">
              <span className="entry-number" aria-hidden="true">
                1.
              </span>
              <p className="entry-definition">
                a <em>small</em> thing that makes a <em>big</em> difference
                <span className="accent">.</span>
              </p>
            </div>

            <div className="entry-origin">
              <span className="entry-label">Origin</span>
              <div>
                <p className="entry-origin-note">
                  A respelling of <em>attitude</em>.
                </p>
                <p className="entry-quote">
                  “attiteud is a small thing that makes a big difference.”
                </p>
              </div>
            </div>

            <div className="entry-def entry-def-secondary">
              <span className="entry-number" aria-hidden="true">
                2.
              </span>
              <div>
                <p className="entry-label">Proper noun</p>
                <p className="entry-definition-small">
                  an independent technology company.
                </p>
              </div>
            </div>
          </div>

          <div className="entry-links">
            <div className="entry-link-row">
              <span className="entry-label">Related</span>
              <p className="entry-terms">
                <a
                  href="#company"
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate("company");
                  }}
                >
                  intelligence
                </a>
                <span aria-hidden="true"> / </span>
                <a
                  href="#company"
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate("company");
                  }}
                >
                  infrastructure
                </a>
                <span aria-hidden="true"> / </span>
                <a
                  href="#company"
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate("company");
                  }}
                >
                  ventures
                </a>
              </p>
            </div>

            <div className="entry-link-row">
              <span className="entry-label">See also</span>
              <a
                className="entry-see-also"
                href="#ventures"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("ventures");
                }}
              >
                <span className="entry-see-name">
                  Gatekeep <span aria-hidden="true">↗</span>
                </span>
                <span className="entry-see-note">
                  an AI-native operating system for venture
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="entry-figure">
          <div className="figure-meta">
            <span>Fig. 1</span>
            <span>Strata / 001</span>
          </div>
          <StrataFigure theme="dark" eager />
          <div className="figure-meta figure-meta-bottom">
            <span>A small thing / a big difference</span>
            <span>Move pointer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
