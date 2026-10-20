import Reveal from "../components/Reveal";

const areas = [
  {
    title: "Intelligence",
    description:
      "Systems that turn information into judgment. Applied AI, decision infrastructure, and software for complex environments.",
  },
  {
    title: "Infrastructure",
    description:
      "The foundational layer: platforms, protocols, and tools that make new products and workflows possible.",
  },
  {
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
          <h2 id="focus-title" className="display focus-title">
            Where we concentrate.
          </h2>
        </Reveal>

        <div className="focus-list">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 60}>
              <article className="focus-row">
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
