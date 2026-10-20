const center = { x: 380, y: 300 };
const activeNodes = new Set([1, 4, 7, 10]);

const nodes = Array.from({ length: 12 }, (_, index) => {
  const angle = ((index * 30 - 90) * Math.PI) / 180;
  const radius = index % 2 === 0 ? 232 : 186;

  return {
    index,
    x: center.x + Math.cos(angle) * radius,
    y: center.y + Math.sin(angle) * radius,
    active: activeNodes.has(index),
  };
});

const ticks = Array.from({ length: 60 }, (_, index) => {
  const angle = ((index * 6 - 90) * Math.PI) / 180;
  const inner = 264;
  const outer = index % 5 === 0 ? 278 : 271;

  return {
    index,
    x1: center.x + Math.cos(angle) * inner,
    y1: center.y + Math.sin(angle) * inner,
    x2: center.x + Math.cos(angle) * outer,
    y2: center.y + Math.sin(angle) * outer,
  };
});

export default function SignalMap() {
  return (
    <svg
      className="signal-map"
      viewBox="0 0 760 620"
      role="img"
      aria-labelledby="signal-map-title"
    >
      <title id="signal-map-title">
        A live signal map with a shared record at its center, connected to
        founders, investors, and their conversations.
      </title>

      <text className="map-label" x="0" y="22">
        GATEKEEP / SIGNAL MAP
      </text>
      <text className="map-label" x="760" y="22" textAnchor="end">
        FIG. 02
      </text>

      <g className="map-ticks">
        {ticks.map((tick) => (
          <line
            key={tick.index}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
          />
        ))}
      </g>

      <g className="map-orbits">
        <circle cx={center.x} cy={center.y} r="78" />
        <circle cx={center.x} cy={center.y} r="154" />
        <circle cx={center.x} cy={center.y} r="232" />
        <circle
          className="map-orbit-dashed"
          cx={center.x}
          cy={center.y}
          r="276"
        />
      </g>

      <g className="map-spokes">
        {nodes.map((node) => (
          <line
            key={node.index}
            className={node.active ? "is-active" : ""}
            x1={center.x}
            y1={center.y}
            x2={node.x}
            y2={node.y}
          />
        ))}
      </g>

      <g className="map-active-pulses">
        {nodes
          .filter((node) => node.active)
          .map((node) => (
            <line
              key={node.index}
              x1={center.x}
              y1={center.y}
              x2={node.x}
              y2={node.y}
            />
          ))}
      </g>

      <g className="map-nodes">
        {nodes.map((node) => (
          <g
            key={node.index}
            className={node.active ? "is-active" : ""}
          >
            <rect
              x={node.x - 4}
              y={node.y - 4}
              width="8"
              height="8"
              transform={`rotate(45 ${node.x} ${node.y})`}
            />
            {node.active ? (
              <circle
                className="map-node-signal"
                cx={node.x}
                cy={node.y}
                r="2"
              />
            ) : null}
          </g>
        ))}
      </g>

      <g className="map-hub">
        <circle cx={center.x} cy={center.y} r="36" />
        <circle cx={center.x} cy={center.y} r="18" />
        <circle className="map-hub-core" cx={center.x} cy={center.y} r="6" />
      </g>

      <text className="map-caption" x="0" y="610">
        SHARED RECORD / COMPOUNDING
      </text>
      <text className="map-caption" x="760" y="610" textAnchor="end">
        LIVE
      </text>
    </svg>
  );
}
