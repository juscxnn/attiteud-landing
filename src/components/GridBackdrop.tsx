import { useEffect, useRef } from "react";

const FINE = 24;
const SUB = 96;
const SUPER = 384;

interface GridBox {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  accent: boolean;
}

interface DragState {
  id: number;
  ox: number;
  oy: number;
}

export default function GridBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const canvas: HTMLCanvasElement = canvasElement;

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let boxes: GridBox[] = [];
    let nextId = 1;
    let initialised = false;
    let drag: DragState | null = null;
    let hover: { x: number; y: number } | null = null;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);
    const snapDown = (value: number) => Math.floor(value / SUB) * SUB;
    const snapNearest = (value: number) => Math.round(value / SUB) * SUB;

    function clampBox(box: GridBox): GridBox {
      box.w = Math.min(box.w, Math.max(SUB, width));
      box.h = Math.min(box.h, Math.max(SUB, height));
      box.x = clamp(
        snapDown(box.x),
        0,
        Math.max(0, snapDown(width - box.w))
      );
      box.y = clamp(
        snapDown(box.y),
        0,
        Math.max(0, snapDown(height - box.h))
      );
      return box;
    }

    function seedBoxes() {
      const cols = Math.max(1, Math.floor(width / SUB));
      const rows = Math.max(1, Math.floor(height / SUB));
      const seeds = [
        { x: 1, y: 1, w: 2, h: 1, accent: false },
        { x: cols - 3, y: 1, w: 2, h: 2, accent: true },
        { x: 1, y: rows - 3, w: 1, h: 2, accent: false },
        { x: cols - 4, y: rows - 2, w: 3, h: 1, accent: false },
        { x: Math.floor(cols / 2) - 1, y: rows - 2, w: 1, h: 1, accent: true },
        { x: Math.floor(cols / 2) + 2, y: 1, w: 2, h: 1, accent: false },
      ];

      boxes = seeds.map((seed) =>
        clampBox({
          id: nextId++,
          x: clamp(seed.x, 0, Math.max(0, cols - 1)) * SUB,
          y: clamp(seed.y, 0, Math.max(0, rows - 1)) * SUB,
          w: clamp(seed.w, 1, cols) * SUB,
          h: clamp(seed.h, 1, rows) * SUB,
          accent: seed.accent,
        })
      );
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!initialised) {
        seedBoxes();
        initialised = true;
      } else {
        boxes = boxes.map(clampBox);
      }

      draw();
    }

    function drawLines(step: number, color: string) {
      ctx.beginPath();
      for (let x = step; x < width; x += step) {
        const px = Math.round(x) + 0.5;
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
      }
      for (let y = step; y < height; y += step) {
        const py = Math.round(y) + 0.5;
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      drawLines(FINE, "rgba(236, 231, 220, 0.035)");
      drawLines(SUB, "rgba(236, 231, 220, 0.08)");
      drawLines(SUPER, "rgba(236, 231, 220, 0.14)");

      if (hover && !drag) {
        ctx.fillStyle = "rgba(232, 168, 124, 0.03)";
        ctx.fillRect(hover.x, hover.y, SUB, SUB);
        ctx.strokeStyle = "rgba(232, 168, 124, 0.2)";
        ctx.strokeRect(hover.x + 0.5, hover.y + 0.5, SUB - 1, SUB - 1);
      }

      for (const box of boxes) {
        const active = drag?.id === box.id;
        ctx.fillStyle = box.accent
          ? "rgba(232, 168, 124, 0.06)"
          : "rgba(236, 231, 220, 0.04)";
        ctx.strokeStyle = active
          ? "rgba(232, 168, 124, 0.75)"
          : box.accent
            ? "rgba(232, 168, 124, 0.28)"
            : "rgba(236, 231, 220, 0.18)";
        ctx.lineWidth = 1;
        ctx.fillRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
        ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
      }
    }

    function localPoint(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function hitTest(point: { x: number; y: number }) {
      for (let i = boxes.length - 1; i >= 0; i--) {
        const box = boxes[i];
        if (
          point.x >= box.x &&
          point.x <= box.x + box.w &&
          point.y >= box.y &&
          point.y <= box.y + box.h
        ) {
          return box;
        }
      }
      return null;
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const point = localPoint(event);
      const hit = hitTest(point);

      if (hit) {
        drag = {
          id: hit.id,
          ox: point.x - hit.x,
          oy: point.y - hit.y,
        };
      } else {
        const x = Math.min(
          snapDown(point.x),
          Math.max(0, snapDown(width - SUB))
        );
        const y = Math.min(
          snapDown(point.y),
          Math.max(0, snapDown(height - SUB))
        );
        const maxW = Math.max(1, Math.floor((width - x) / SUB));
        const maxH = Math.max(1, Math.floor((height - y) / SUB));
        let w = 1 + Math.floor(Math.random() * Math.min(3, maxW));
        let h = 1 + Math.floor(Math.random() * Math.min(3, maxH));

        if (Math.random() < 0.35) h = w;
        else if (Math.random() < 0.2) w = h;

        const box: GridBox = {
          id: nextId++,
          x,
          y,
          w: w * SUB,
          h: h * SUB,
          accent: Math.random() < 0.18,
        };

        boxes.push(box);
        drag = { id: box.id, ox: 0, oy: 0 };
      }

      hover = null;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      event.preventDefault();
      draw();
    }

    function onPointerMove(event: PointerEvent) {
      const point = localPoint(event);

      if (drag) {
        const box = boxes.find((item) => item.id === drag?.id);
        if (box) {
          const maxX = Math.max(0, snapDown(width - box.w));
          const maxY = Math.max(0, snapDown(height - box.h));
          box.x = clamp(snapNearest(point.x - drag.ox), 0, maxX);
          box.y = clamp(snapNearest(point.y - drag.oy), 0, maxY);
        }
        canvas.style.cursor = "grabbing";
        draw();
        return;
      }

      const hit = hitTest(point);
      canvas.style.cursor = hit ? "grab" : "crosshair";
      hover = {
        x: clamp(snapDown(point.x), 0, Math.max(0, snapDown(width - SUB))),
        y: clamp(snapDown(point.y), 0, Math.max(0, snapDown(height - SUB))),
      };
      draw();
    }

    function onPointerUp(event: PointerEvent) {
      if (!drag) return;
      drag = null;
      canvas.style.cursor = "crosshair";
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      draw();
    }

    function onPointerLeave() {
      if (drag) return;
      hover = null;
      canvas.style.cursor = "crosshair";
      draw();
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", resize);

    resize();

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="grid-backdrop"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
