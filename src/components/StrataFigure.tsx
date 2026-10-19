import { useState } from "react";

interface StrataFigureProps {
  theme?: "light" | "dark";
  eager?: boolean;
}

export default function StrataFigure({
  theme = "dark",
  eager = false,
}: StrataFigureProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`strata-figure${loaded ? " is-loaded" : ""}`}
      aria-hidden="true"
    >
      <iframe
        src={`${import.meta.env.BASE_URL}hairline/strata.html?theme=${theme}`}
        title="Attiteud strata system study"
        loading={eager ? "eager" : "lazy"}
        tabIndex={-1}
        sandbox="allow-scripts"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
