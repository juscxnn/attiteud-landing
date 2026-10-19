export default function Cycle() {
  return (
    <div className="cycle" aria-hidden="true">
      <svg className="cycle-stage cycle-empty" viewBox="0 0 100 100" fill="none">
        <circle className="cycle-empty-ring" cx="50" cy="50" r="36" />
      </svg>

      <svg className="cycle-stage cycle-flywheel" viewBox="0 0 100 100" fill="none">
        <circle className="cycle-ring" cx="50" cy="50" r="36" />
        <g className="cycle-asterisk">
          <line x1="50" y1="14" x2="50" y2="86" />
          <line x1="50" y1="14" x2="50" y2="86" transform="rotate(45 50 50)" />
          <line x1="50" y1="14" x2="50" y2="86" transform="rotate(90 50 50)" />
          <line x1="50" y1="14" x2="50" y2="86" transform="rotate(135 50 50)" />
          <circle className="cycle-signal" cx="50" cy="14" r="2" />
          <circle className="cycle-signal" cx="86" cy="50" r="2" />
          <circle className="cycle-signal" cx="50" cy="86" r="2" />
          <circle className="cycle-signal" cx="14" cy="50" r="2" />
        </g>
        <circle className="cycle-core" cx="50" cy="50" r="3" />
      </svg>

      <svg className="cycle-stage cycle-full" viewBox="0 0 100 100" fill="none">
        <circle className="cycle-complete" cx="50" cy="50" r="36" />
      </svg>
    </div>
  );
}
