interface HorizonMarkProps {
  className?: string;
}

export default function HorizonMark({ className = "" }: HorizonMarkProps) {
  return (
    <svg
      className={`horizon-mark ${className}`.trim()}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 19a11 11 0 0 1 22 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M0 19h8M24 19h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle className="horizon-mark-dot" cx="16" cy="19" r="2.2" />
    </svg>
  );
}
