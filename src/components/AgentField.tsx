import { useEffect, useRef } from "react";

interface Agent {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  frequency: number;
  amplitude: number;
  size: number;
  kind: number;
  heat: number;
}

interface AgentFieldProps {
  className?: string;
}

export default function AgentField({ className = "" }: AgentFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let agents: Agent[] = [];
    const pointer = { x: 0, y: 0, active: false };

    const createAgents = () => {
      const compact = width < 480;
      const columns = compact ? 7 : width < 760 ? 9 : 11;
      const rows = compact ? 9 : 12;

      agents = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x =
            ((column + 0.5) / columns) * width +
            (Math.random() - 0.5) * (width / columns) * 0.42;
          const y =
            ((row + 0.5) / rows) * height +
            (Math.random() - 0.5) * (height / rows) * 0.42;

          agents.push({
            x,
            y,
            baseX: x,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
            frequency: 0.08 + Math.random() * 0.18,
            amplitude: 4 + Math.random() * 9,
            size: 1 + Math.random() * 1.4,
            kind: Math.random() > 0.82 ? 1 : 0,
            heat: 0,
          });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (!width || !height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      createAgents();
      if (reduced) draw(0);
    };

    const draw = (time: number) => {
      const seconds = time / 1000;
      context.clearRect(0, 0, width, height);

      for (const agent of agents) {
        let targetX =
          agent.baseX +
          Math.cos(seconds * agent.frequency + agent.phase) *
            agent.amplitude;
        let targetY =
          agent.baseY +
          Math.sin(
            seconds * agent.frequency * 1.25 + agent.phase * 1.6
          ) *
            agent.amplitude;

        let targetHeat = 0;

        if (pointer.active) {
          const dx = pointer.x - agent.x;
          const dy = pointer.y - agent.y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / 170);

          if (influence > 0) {
            targetX += dx * influence * 0.45;
            targetY += dy * influence * 0.45;
            targetHeat = influence;
          }
        }

        const ambient = Math.sin(
          seconds * 0.72 + agent.phase * 3.4
        );
        if (ambient > 0.986) targetHeat = Math.max(targetHeat, 0.42);

        agent.heat += (targetHeat - agent.heat) * 0.075;
        agent.x += (targetX - agent.x) * 0.045;
        agent.y += (targetY - agent.y) * 0.045;
      }

      const connectionRange = Math.min(110, Math.max(52, width * 0.16));

      for (let i = 0; i < agents.length; i += 1) {
        const first = agents[i];

        for (let j = i + 1; j < agents.length; j += 1) {
          const second = agents[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.hypot(dx, dy);

          if (distance > connectionRange) continue;

          const heat = Math.max(first.heat, second.heat);
          const alpha =
            (1 - distance / connectionRange) * 0.1 + heat * 0.18;

          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle =
            heat > 0.18
              ? `rgba(255, 77, 0, ${Math.min(0.55, alpha)})`
              : `rgba(242, 239, 230, ${alpha})`;
          context.lineWidth = 0.65;
          context.stroke();
        }
      }

      for (const agent of agents) {
        const hot = agent.heat > 0.18;
        const color = hot
          ? `rgba(255, 77, 0, ${0.48 + agent.heat * 0.5})`
          : `rgba(242, 239, 230, ${0.25 + agent.size * 0.1})`;

        if (agent.kind === 1) {
          context.beginPath();
          context.moveTo(agent.x - 2.4, agent.y);
          context.lineTo(agent.x + 2.4, agent.y);
          context.moveTo(agent.x, agent.y - 2.4);
          context.lineTo(agent.x, agent.y + 2.4);
          context.strokeStyle = color;
          context.lineWidth = 0.9;
          context.stroke();
        } else {
          context.beginPath();
          context.arc(agent.x, agent.y, agent.size, 0, Math.PI * 2);
          context.fillStyle = color;
          context.fill();
        }
      }

      if (pointer.active) {
        context.beginPath();
        context.arc(pointer.x, pointer.y, 24, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255, 77, 0, 0.22)";
        context.lineWidth = 0.8;
        context.stroke();
      }
    };

    const loop = (time: number) => {
      if (!visible) {
        frame = 0;
        return;
      }
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || !visible || frame) return;
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`agent-field ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
