import { useState } from "react";

export default function StrataFigure() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`strata-figure${loaded ? " is-loaded" : ""}`}
      aria-hidden="true"
    >
      <iframe
        src={`${import.meta.env.BASE_URL}hairline/strata.html`}
        title="Attiteud strata system study"
        loading="lazy"
        tabIndex={-1}
        sandbox="allow-scripts"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
