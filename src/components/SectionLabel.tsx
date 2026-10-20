interface SectionLabelProps {
  number: string;
  label: string;
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="folio">
      <span className="folio-number">{number}</span>
      <span className="folio-label">{label}</span>
      <span className="folio-line" aria-hidden="true" />
    </div>
  );
}
