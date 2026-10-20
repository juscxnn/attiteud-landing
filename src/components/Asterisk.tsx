interface AsteriskProps {
  className?: string;
}

export default function Asterisk({ className = "" }: AsteriskProps) {
  return (
    <svg
      className={`asterisk ${className}`.trim()}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        <line x1="50" y1="6" x2="50" y2="94" />
        <line x1="50" y1="6" x2="50" y2="94" transform="rotate(45 50 50)" />
        <line x1="50" y1="6" x2="50" y2="94" transform="rotate(90 50 50)" />
        <line x1="50" y1="6" x2="50" y2="94" transform="rotate(135 50 50)" />
      </g>
      <circle className="asterisk-core" cx="50" cy="50" r="2.4" />
    </svg>
  );
}
