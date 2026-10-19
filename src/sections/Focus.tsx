import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import StrataFigure from "../components/StrataFigure";

const areas = [
  {
    index: "01",
    title: "Intelligence",
    description: "Information, analysis, decision-making systems, and applied AI.",
  },
  {
    index: "02",
    title: "Infrastructure",
    description: "Foundational technologies that enable new products and workflows.",
  },
  {
    index: "03",
    title: "Ventures",
    description:
      "Independent software products and businesses developed and operated by Attiteud.",
  },
];

export default function Focus() {
  return (
    <section id="focus" className="section focus" aria-labelledby="focus-title">
      <div className="container">
        <Reveal>
          <SectionLabel index="02">Focus</SectionLabel>
        </Reveal>

        <div className="focus-head">
          <Reveal>
            <h2 id="focus-title" className="display focus-title">
              Where we concentrate.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <div className="focus-instrument">
              <div className="instrument-label">
                <span>System study</span>
                <span>001</span>
              </div>
              <StrataFigure />
              <p className="section-note">Three domains, one long horizon.</p>
            </div>
          </Reveal>
        </div>

        <div className="focus-list">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 70}>
              <article className="focus-row">
                <span className="focus-index" aria-hidden="true">
                  {area.index}
                </span>
                <h3 className="focus-area-title">{area.title}</h3>
                <p className="focus-desc">{area.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
