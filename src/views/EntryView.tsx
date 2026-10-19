import Cycle from "../components/Cycle";
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
      <div className="view-inner entry-layout">
        <h1 className="entry-headword" data-view-heading tabIndex={-1}>
          at·ti·teud
        </h1>

        <div className="entry-pronunciation">
          <span>/ˈætɪtjuːd/</span>
          <span className="entry-pos">noun</span>
        </div>

        <p className="entry-definition">
          <span className="entry-number" aria-hidden="true">
            1.
          </span>{" "}
          a <em>small</em> thing that makes a <em>big</em> difference
          <span className="accent">.</span>
        </p>

        <p className="entry-quote">
          “attiteud is a small thing that makes a big difference.”
        </p>

        <Cycle />

        <div className="entry-meta">
          <p className="entry-sense">
            <span className="entry-number" aria-hidden="true">
              2.
            </span>{" "}
            <span className="entry-label">Proper noun</span>{" "}
            <span className="entry-sense-text">
              an independent technology company.
            </span>
          </p>

          <div className="entry-links">
            <p className="entry-link-row">
              <span className="entry-label">Related</span>
              <span className="entry-terms">
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
              </span>
            </p>

            <p className="entry-link-row">
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
                </span>{" "}
                <span className="entry-see-note">
                  an AI-native operating system for venture
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
