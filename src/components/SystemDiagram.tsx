export default function SystemDiagram() {
  return (
    <svg
      className="system-diagram"
      viewBox="0 0 1200 680"
      role="img"
      aria-labelledby="diagram-title"
    >
      <title id="diagram-title">
        A three-layer agent stack: cognition, action, and control, connected by
        a shared runtime and a control feedback loop.
      </title>

      <text className="diagram-meta" x="0" y="24">
        ATTITEUD / AGENT STACK
      </text>
      <text className="diagram-meta" x="1200" y="24" textAnchor="end">
        FIG. 01
      </text>
      <line className="diagram-rule" x1="0" y1="48" x2="1200" y2="48" />

      <line className="diagram-spine" x1="620" y1="104" x2="620" y2="556" />
      <line
        className="diagram-pulse"
        x1="620"
        y1="104"
        x2="620"
        y2="556"
      />
      <text
        className="diagram-runtime"
        x="604"
        y="88"
        textAnchor="end"
      >
        RUNTIME
      </text>

      <g className="diagram-layer">
        <text className="diagram-index" x="0" y="144">
          01
        </text>
        <text className="diagram-layer-title" x="0" y="176">
          COGNITION
        </text>
        <line className="diagram-track" x1="260" y1="150" x2="1040" y2="150" />
        <circle className="diagram-node" cx="360" cy="150" r="4" />
        <circle className="diagram-node" cx="620" cy="150" r="5" />
        <circle className="diagram-node" cx="880" cy="150" r="4" />
        <text className="diagram-label" x="360" y="180" textAnchor="middle">
          MODELS
        </text>
        <text className="diagram-label" x="620" y="180" textAnchor="middle">
          MEMORY
        </text>
        <text className="diagram-label" x="880" y="180" textAnchor="middle">
          REASONING
        </text>
        <circle className="diagram-signal" cx="620" cy="150" r="3" />
      </g>

      <g className="diagram-layer">
        <text className="diagram-index" x="0" y="314">
          02
        </text>
        <text className="diagram-layer-title" x="0" y="346">
          ACTION
        </text>
        <line className="diagram-track" x1="260" y1="320" x2="1040" y2="320" />
        <circle className="diagram-node" cx="360" cy="320" r="4" />
        <circle className="diagram-node" cx="620" cy="320" r="5" />
        <circle className="diagram-node" cx="880" cy="320" r="4" />
        <text className="diagram-label" x="360" y="350" textAnchor="middle">
          TOOLS
        </text>
        <text className="diagram-label" x="620" y="350" textAnchor="middle">
          INTERFACES
        </text>
        <text className="diagram-label" x="880" y="350" textAnchor="middle">
          PERMISSIONS
        </text>
        <circle className="diagram-signal" cx="620" cy="320" r="3" />
      </g>

      <g className="diagram-layer">
        <text className="diagram-index" x="0" y="484">
          03
        </text>
        <text className="diagram-layer-title" x="0" y="516">
          CONTROL
        </text>
        <line className="diagram-track" x1="260" y1="490" x2="1040" y2="490" />
        <circle className="diagram-node" cx="360" cy="490" r="4" />
        <circle className="diagram-node" cx="620" cy="490" r="5" />
        <circle className="diagram-node" cx="880" cy="490" r="4" />
        <text className="diagram-label" x="360" y="520" textAnchor="middle">
          EVALS
        </text>
        <text className="diagram-label" x="620" y="520" textAnchor="middle">
          TELEMETRY
        </text>
        <text className="diagram-label" x="880" y="520" textAnchor="middle">
          GUARDRAILS
        </text>
        <circle className="diagram-signal" cx="620" cy="490" r="3" />
      </g>

      <path
        className="diagram-feedback"
        d="M1040 490H1110V150H1040"
      />
      <path
        className="diagram-feedback-arrow"
        d="M1040 150l14-6v12Z"
      />
      <text className="diagram-meta" x="1122" y="320">
        FEEDBACK
      </text>

      <line className="diagram-rule" x1="0" y1="604" x2="1200" y2="604" />
      <text className="diagram-meta" x="0" y="640">
        01—03 / SYSTEM LAYERS
      </text>
      <text className="diagram-meta" x="600" y="640">
        ● SIGNAL
      </text>
      <text className="diagram-meta" x="1200" y="640" textAnchor="end">
        RUNTIME / SHARED
      </text>
    </svg>
  );
}
