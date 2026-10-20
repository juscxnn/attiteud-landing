import Reveal from "../components/Reveal";
import SectionIndex from "../components/SectionIndex";
import SystemDiagram from "../components/SystemDiagram";

const layers = [
  {
    number: "01",
    title: "Cognition",
    copy: "Models, memory, and reasoning loops tuned for domain work.",
  },
  {
    number: "02",
    title: "Action",
    copy: "Tools, interfaces, and permissions that let agents do real work.",
  },
  {
    number: "03",
    title: "Control",
    copy: "Evaluation, telemetry, and guardrails that make autonomy operable.",
  },
];

export default function Systems() {
  return (
    <section
      id="systems"
      className="section section-bone systems"
      aria-labelledby="systems-title"
    >
      <div className="container">
        <Reveal>
          <SectionIndex number="02" label="Systems" />
        </Reveal>

        <div className="systems-head">
          <Reveal>
            <h2 id="systems-title" className="section-title systems-title">
              The stack for agency
              <span className="signal">.</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="systems-intro">
              We build across the full system — not a model wrapped in a chat
              box. Cognition, action, and control, on one operating layer.
            </p>
          </Reveal>
        </div>

        <div className="stack-items">
          {layers.map((layer, index) => (
            <Reveal key={layer.number} delay={index * 70}>
              <article className="stack-item">
                <span className="stack-number">{layer.number}</span>
                <h3>{layer.title}</h3>
                <p>{layer.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="diagram-wrap">
          <SystemDiagram />
        </Reveal>
      </div>
    </section>
  );
}
