export default function Cycle() {
  return (
    <div className="cycle" aria-hidden="true">
      <svg className="cycle-stage cycle-empty" viewBox="0 0 100 100" fill="none">
        <circle className="cycle-empty-ring" cx="50" cy="50" r="36" />
      </svg>

      <svg className="cycle-stage cycle-flywheel" viewBox="0 0 100 100" fill="none">
        <circle className="cycle-ring" cx="50" cy="50" r="36" />
        <g className="cycle-rotor">
          {Array.from({ length: 8 }).map((_, index) => (
            <line
              key={index}
              x1="50"
              y1="11"
              x2="50"
              y2="21"
              transform={`rotate(${index * 45} 50 50)`}
            />
          ))}
          <circle className="cycle-signal" cx="50" cy="11" r="2.4" />
        </g>
        <circle className="cycle-core" cx="50" cy="50" r="4" />
      </svg>

      <svg className="cycle-stage cycle-full" viewBox="0 0 100 100" fill="none">
        <circle className="cycle-complete" cx="50" cy="50" r="36" />
      </svg>
    </div>
  );
}
