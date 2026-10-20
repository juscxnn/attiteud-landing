interface MarkProps {
  className?: string;
}

export default function Mark({ className = "" }: MarkProps) {
  return (
    <svg
      className={`mark ${className}`.trim()}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.6 27.2 13.9 6.8"
        stroke="currentColor"
        strokeWidth="3.3"
        strokeLinecap="square"
      />
      <path
        d="M26.4 27.2 18.1 6.8"
        stroke="currentColor"
        strokeWidth="3.3"
        strokeLinecap="square"
      />
      <path
        d="M10.1 20.6h11.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <circle
        className="mark-signal"
        cx="16"
        cy="3.7"
        r="2.6"
        fill="var(--mark-signal, #ff4d00)"
      />
    </svg>
  );
}
