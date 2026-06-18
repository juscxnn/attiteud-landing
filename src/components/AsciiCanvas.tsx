import { useEffect, useRef } from "react";

const FONT_MAP = ` .'\u00b7-\u223c:\u2022*|/%#@`;
const COL_SPAN = 8;
const ROW_SPAN = 11;
const MOUSE_GLOW_RADIUS = 220;
const CLICK_PATCH_RADIUS = 90;
const CLICK_FADE_RATE = 0.0018;

interface GridCell {
  baseX: number;
  baseY: number;
  row: number;
  col: number;
  clickIntensity: number;
}

interface ClickPatch {
  x: number;
  y: number;
  intensity: number;
}

export default function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetDarknessRef = useRef(0);
  const currentDarknessRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const pxGrid = Math.ceil(1 / dpr);

    let cols = 0;
    let rows = 0;
    let grid: GridCell[] = [];
    let mouseX = -10000;
    let mouseY = -10000;
    const clickPatches: ClickPatch[] = [];
    let animId = 0;

    function setupGrid() {
      const w = Math.ceil(window.innerWidth / pxGrid);
      const h = Math.ceil(window.innerHeight / pxGrid);
      canvas!.width = w * pxGrid;
      canvas!.height = h * pxGrid;
      canvas!.style.width = "100vw";
      canvas!.style.height = "100vh";
      cols = Math.floor(w / COL_SPAN);
      rows = Math.floor(h / ROW_SPAN);

      const prevGrid = grid;
      grid = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const existing = prevGrid.find((p) => p.row === r && p.col === c);
          grid.push({
            baseX: c * COL_SPAN,
            baseY: r * ROW_SPAN,
            row: r,
            col: c,
            clickIntensity: existing ? existing.clickIntensity : 0,
          });
        }
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX / pxGrid;
      mouseY = e.clientY / pxGrid;
    }
    function handleMouseLeave() {
      mouseX = -10000;
      mouseY = -10000;
    }
    function handleClick(e: MouseEvent) {
      clickPatches.push({
        x: e.clientX / pxGrid,
        y: e.clientY / pxGrid,
        intensity: 1.0,
      });
      if (clickPatches.length > 40) clickPatches.shift();
    }

    // Smooth scroll-based darkness detection
    function updateDarkness() {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      if (docH <= 0) return;

      const progress = y / docH;
      let target: number;

      if (progress < 0.25) {
        target = 0;
      } else if (progress < 0.42) {
        // Light to dark: smooth ramp 0 -> 1
        target = (progress - 0.25) / 0.17;
      } else if (progress < 0.58) {
        target = 1;
      } else if (progress < 0.75) {
        // Dark to light: smooth ramp 1 -> 0
        target = 1 - (progress - 0.58) / 0.17;
      } else {
        target = 0;
      }

      targetDarknessRef.current = Math.max(0, Math.min(1, target));
    }

    function animate() {
      const time = performance.now();
      const w = canvas!.width;
      const h = canvas!.height;
      const context = ctx!;

      // Smoothly interpolate current darkness toward target (buttery smooth)
      const td = targetDarknessRef.current;
      currentDarknessRef.current += (td - currentDarknessRef.current) * 0.04;
      const d = currentDarknessRef.current;

      // Interpolated background: light (#f0ebe3) -> dark (#0a0a0a)
      const bgR = Math.round(240 + (10 - 240) * d);
      const bgG = Math.round(235 + (10 - 235) * d);
      const bgB = Math.round(227 + (10 - 227) * d);
      context.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
      context.fillRect(0, 0, w, h);

      context.font = `${Math.floor(8 * dpr)}px "IBM Plex Mono", monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      const fontLen = FONT_MAP.length;

      for (let i = clickPatches.length - 1; i >= 0; i--) {
        clickPatches[i].intensity -= CLICK_FADE_RATE;
        if (clickPatches[i].intensity <= 0) clickPatches.splice(i, 1);
      }

      const scrollY = window.scrollY || 0;

      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];

        const flow =
          Math.sin(cell.col * 0.05 + cell.row * 0.035 + time * 0.00018) * 0.5 +
          0.5;
        const flow2 =
          Math.cos(cell.col * 0.02 - cell.row * 0.045 + time * 0.00012) * 0.5 +
          0.5;
        const flow3 =
          Math.sin(cell.col * 0.08 + cell.row * 0.06 - time * 0.00008) * 0.5 +
          0.5;
        let density = flow * 0.4 + flow2 * 0.35 + flow3 * 0.25;

        const scrollWave = Math.sin(
          cell.row * 0.015 +
            (scrollY / window.innerHeight) * Math.PI * 3 -
            cell.col * 0.008
        );
        density = density * 0.75 + (scrollWave * 0.5 + 0.5) * 0.25;

        const mdx = mouseX - cell.baseX;
        const mdy = mouseY - cell.baseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_GLOW_RADIUS) {
          const glow = (1 - mDist / MOUSE_GLOW_RADIUS) * 0.35;
          density = Math.min(1, density + glow);
        }

        let clickBoost = 0;
        for (const patch of clickPatches) {
          const cdx = patch.x - cell.baseX;
          const cdy = patch.y - cell.baseY;
          const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cDist < CLICK_PATCH_RADIUS) {
            clickBoost +=
              (1 - cDist / CLICK_PATCH_RADIUS) * patch.intensity * 0.7;
          }
        }
        density = Math.min(1, density + clickBoost);

        const charIndex = Math.floor(density * (fontLen - 1));
        const finalIndex = Math.max(0, Math.min(charIndex, fontLen - 1));

        // Interpolated alpha: light mode -> dark mode
        const lightAlpha = 0.04 + (finalIndex / fontLen) * 0.2;
        const darkAlpha = 0.05 + (finalIndex / fontLen) * 0.22;
        const alpha = lightAlpha + (darkAlpha - lightAlpha) * d;

        // Interpolated char color: dark brown -> warm off-white
        const r = Math.round(30 + (218 - 30) * d);
        const g = Math.round(28 + (212 - 28) * d);
        const b = Math.round(24 + (200 - 24) * d);

        context.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        context.fillText(
          FONT_MAP[finalIndex],
          cell.baseX * pxGrid,
          cell.baseY * pxGrid
        );
      }

      animId = requestAnimationFrame(animate);
    }

    document.fonts.ready.then(() => {
      setupGrid();
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("click", handleClick);
      window.addEventListener("resize", setupGrid);
      window.addEventListener("scroll", updateDarkness, { passive: true });
      updateDarkness();
      animId = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", setupGrid);
      window.removeEventListener("scroll", updateDarkness);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
