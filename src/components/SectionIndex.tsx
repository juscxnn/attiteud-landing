interface SectionIndexProps {
  number: string;
  label: string;
}

export default function SectionIndex({ number, label }: SectionIndexProps) {
  return (
    <div className="section-index">
      <span className="section-index-dot" aria-hidden="true" />
      <span className="section-index-number">{number}</span>
      <span className="section-index-label">{label}</span>
      <span className="section-index-line" aria-hidden="true" />
    </div>
  );
}
