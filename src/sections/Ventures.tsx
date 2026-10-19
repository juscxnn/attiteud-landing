import { useState } from "react";
import RelayFigure from "../components/RelayFigure";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

interface Venture {
  id: string;
  name: string;
  domain: string;
  descriptor: string;
  description: string;
  href: string;
  status: string;
}

const ventures: Venture[] = [
  {
    id: "gatekeep",
    name: "Gatekeep",
    domain: "gatekeep.vc",
    descriptor: "An AI-native operating system for venture.",
    description:
      "Gatekeep gives founders and investors a shared system for building, qualifying, and discovering venture opportunities. Every conversation adds to one record that compounds.",
    href: "https://gatekeep.vc",
    status: "In operation",
  },
];

export default function Ventures() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="ventures"
      className="section ventures"
      data-tone="dark"
      aria-labelledby="ventures-title"
    >
      <div className="container">
        <Reveal>
          <SectionLabel index="03">Selected Ventures</SectionLabel>
        </Reveal>

        <div className="ventures-head">
          <Reveal>
            <h2 id="ventures-title" className="display ventures-title">
              Selected Ventures.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="section-note">
              Attiteud develops and operates independent software businesses.
              Gatekeep is the first to be presented publicly.
            </p>
          </Reveal>
        </div>

        <div className="venture-list">
          {ventures.map((venture, index) => {
            const panelId = `venture-panel-${venture.id}`;
            const isOpen = openId === venture.id;

            return (
              <Reveal key={venture.id} delay={index * 80}>
                <article className="venture" data-open={isOpen}>
                  <div className="venture-head">
                    <span className="venture-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="venture-identity">
                      <h3 className="venture-name">{venture.name}</h3>
                      <p>{venture.descriptor}</p>
                    </div>

                    <div className="venture-actions">
                      <span className="venture-status">
                        <span className="status-dot" aria-hidden="true" />
                        {venture.status}
                      </span>

                      <a
                        className="venture-link"
                        href={venture.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {venture.domain} <span aria-hidden="true">↗</span>
                      </a>

                      <button
                        type="button"
                        className="venture-disclosure"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : venture.id)}
                      >
                        <span className="sr-only">
                          {isOpen
                            ? `Hide ${venture.name} details`
                            : `Show ${venture.name} details`}
                        </span>
                        <span className="disclosure-icon" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div
                      className="venture-panel"
                      id={panelId}
                      role="region"
                      aria-label={`${venture.name} details`}
                    >
                      <div className="venture-panel-copy">
                        <p>{venture.description}</p>
                        <p className="venture-attribution">
                          Developed and operated by Attiteud.
                        </p>
                        <a
                          className="venture-cta"
                          href={venture.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Gatekeep <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                      <div className="venture-figure">
                        <RelayFigure />
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="ventures-more">More in time.</p>
      </div>
    </section>
  );
}
