interface AsteriskProps {
  className?: string;
}

export default function Asterisk({ className = "" }: AsteriskProps) {
  return (
    <svg
      className={`asterisk ${className}`.trim()}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="asterisk-rotor">
        <circle
          cx="200"
          cy="200"
          r="148"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="1 9"
        />
        <circle
          cx="200"
          cy="200"
          r="104"
          stroke="currentColor"
          strokeOpacity="0.14"
        />
        {[0, 45, 90, 135].map((rotation) => (
          <line
            key={rotation}
            x1="200"
            y1="22"
            x2="200"
            y2="378"
            stroke="currentColor"
            strokeOpacity="0.34"
            transform={`rotate(${rotation} 200 200)`}
          />
        ))}
        <circle cx="200" cy="52" r="5" fill="currentColor" fillOpacity="0.55" />
        <circle cx="348" cy="200" r="5" fill="currentColor" fillOpacity="0.55" />
        <circle cx="200" cy="348" r="5" fill="currentColor" fillOpacity="0.55" />
        <circle cx="52" cy="200" r="5" fill="currentColor" fillOpacity="0.55" />
      </g>
    </svg>
  );
}
