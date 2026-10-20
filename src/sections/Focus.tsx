import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";

const areas = [
  {
    number: "01",
    title: "Intelligence",
    description:
      "Systems that turn information into judgment. Applied AI, decision infrastructure, and software for complex environments.",
  },
  {
    number: "02",
    title: "Infrastructure",
    description:
      "The foundational layer: platforms, protocols, and tools that make new products and workflows possible.",
  },
  {
    number: "03",
    title: "Ventures",
    description:
      "Businesses we build, own, and operate. Independent products with their own markets and horizons.",
  },
];

export default function Focus() {
  return (
    <section id="focus" className="section focus" aria-labelledby="focus-title">
      <div className="container">
        <Reveal>
          <SectionLabel number="02" label="Focus" />
        </Reveal>

        <Reveal delay={60}>
          <h2 id="focus-title" className="display focus-title">
            Where we build<span className="accent">.</span>
          </h2>
        </Reveal>

        <div className="focus-list">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 70}>
              <article className="focus-row">
                <span className="focus-number">{area.number}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
