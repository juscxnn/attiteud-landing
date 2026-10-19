import type { ReactNode } from "react";

interface SectionLabelProps {
  index: string;
  children: ReactNode;
}

export default function SectionLabel({ index, children }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span className="section-label-index" aria-hidden="true">
        {index}
      </span>
      <span className="section-label-line" aria-hidden="true" />
      <span className="section-label-text">{children}</span>
    </div>
  );
}
