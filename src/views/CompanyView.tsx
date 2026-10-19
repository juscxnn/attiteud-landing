interface CompanyViewProps {
  active: boolean;
}

const areas = [
  {
    title: "Intelligence",
    description: "Information, analysis, decision-making systems, and applied AI.",
  },
  {
    title: "Infrastructure",
    description: "Foundational technologies that enable new products and workflows.",
  },
  {
    title: "Ventures",
    description:
      "Independent software products and businesses developed and operated by Attiteud.",
  },
];

const model = ["Identify", "Develop", "Operate"];

export default function CompanyView({ active }: CompanyViewProps) {
  return (
    <section
      id="company"
      className={`view company-view${active ? " is-active" : ""}`}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="view-inner">
        <div className="company-grid">
          <div className="company-lead">
            <h2 className="view-title" data-view-heading tabIndex={-1}>
              Built on conviction.
            </h2>
            <p className="view-lede">
              We identify structural problems, develop the systems to address
              them, and build businesses around opportunities with lasting
              relevance.
            </p>
            <p className="view-note">We develop, own, and operate what we build.</p>

            <div className="company-model" aria-label="Our approach">
              {model.map((step) => (
                <div className="model-step" key={step}>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="company-focus">
            {areas.map((area) => (
              <article className="focus-row" key={area.title}>
                <h3 className="focus-title">{area.title}</h3>
                <p className="focus-desc">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
