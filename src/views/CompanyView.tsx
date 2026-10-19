interface CompanyViewProps {
  active: boolean;
}

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
        <div className="view-head">
          <span className="view-label">01 / Company</span>
          <span className="view-label">Proper noun</span>
        </div>

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
              {model.map((step, index) => (
                <div className="model-step" key={step}>
                  <span className="model-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="company-focus">
            <div className="focus-head">
              <span className="view-label">Focus</span>
              <span className="view-label">Three domains</span>
            </div>

            {areas.map((area) => (
              <article className="focus-row" key={area.title}>
                <span className="focus-index" aria-hidden="true">
                  {area.index}
                </span>
                <div>
                  <h3 className="focus-title">{area.title}</h3>
                  <p className="focus-desc">{area.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
