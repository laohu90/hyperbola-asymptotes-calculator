import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FocalAxis, HyperbolaProperties } from '../types/conic';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { TranslationDictionary } from '../i18n/translations';

interface InteractiveGraphProps {
  properties: HyperbolaProperties;
  showComparisonEllipse?: boolean;
  t: TranslationDictionary['canvas'];
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  properties,
  showComparisonEllipse = false,
  t,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState<number>(36); // pixels per coordinate unit
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);

  // Toggles for visual aids
  const [showBox, setShowBox] = useState<boolean>(true);
  const [showAsymptotes, setShowAsymptotes] = useState<boolean>(true);
  const [showFoci, setShowFoci] = useState<boolean>(true);
  const [showEllipse, setShowEllipse] = useState<boolean>(showComparisonEllipse);

  const { axis, h, k, a, b, c, vertices, foci, asymptoteSlopes } = properties;

  // Auto-center on center (h, k) when parameters change
  useEffect(() => {
    setOffset({ x: -h * scale, y: k * scale });
  }, [h, k]);

  // Sync prop changes
  useEffect(() => {
    setShowEllipse(showComparisonEllipse);
  }, [showComparisonEllipse]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas - crisp pure white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Screen origin (0,0) in canvas space
    const originX = width / 2 + offset.x;
    const originY = height / 2 + offset.y;

    // Coordinate conversions
    const toScreenX = (mathX: number) => originX + mathX * scale;
    const toScreenY = (mathY: number) => originY - mathY * scale;
    const toMathX = (screenX: number) => (screenX - originX) / scale;
    const toMathY = (screenY: number) => (originY - screenY) / scale;

    // 1. Draw Grid Lines
    const step = scale < 20 ? 5 : scale < 50 ? 2 : 1;
    const minX = Math.floor(toMathX(0) / step) * step;
    const maxX = Math.ceil(toMathX(width) / step) * step;
    const minY = Math.floor(toMathY(height) / step) * step;
    const maxY = Math.ceil(toMathY(0) / step) * step;

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#f1f5f9'; // slate-100
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8'; // slate-400

    // Vertical grid lines
    for (let x = minX; x <= maxX; x += step) {
      const sx = toScreenX(x);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.stroke();

      if (x !== 0 && Math.abs(x % step) < 1e-4) {
        ctx.fillText(x.toString(), sx + 2, originY + 12);
      }
    }

    // Horizontal grid lines
    for (let y = minY; y <= maxY; y += step) {
      const sy = toScreenY(y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();

      if (y !== 0 && Math.abs(y % step) < 1e-4) {
        ctx.fillText(y.toString(), originX + 4, sy - 2);
      }
    }

    // 2. Draw Main Coordinate Axes
    ctx.strokeStyle = '#cbd5e1'; // slate-300
    ctx.lineWidth = 1.5;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('x', width - 14, originY - 6);
    ctx.fillText('y', originX + 8, 14);
    ctx.fillText('O', originX - 12, originY + 14);

    // 3. Draw Comparison Ellipse (if toggled)
    if (showEllipse) {
      ctx.save();
      ctx.strokeStyle = '#10b981'; // emerald-500
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);

      ctx.beginPath();
      const numPts = 100;
      for (let i = 0; i <= numPts; i++) {
        const theta = (i / numPts) * 2 * Math.PI;
        const ex = axis === 'x' ? h + a * Math.cos(theta) : h + b * Math.cos(theta);
        const ey = axis === 'x' ? k + b * Math.sin(theta) : k + a * Math.sin(theta);
        const sx = toScreenX(ex);
        const sy = toScreenY(ey);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.restore();
    }

    // 4. Draw Characteristic Rectangle Box (2a x 2b)
    if (showBox) {
      ctx.save();
      ctx.strokeStyle = '#93c5fd'; // blue-300
      ctx.fillStyle = 'rgba(239, 246, 255, 0.4)'; // blue-50 40%
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);

      const boxHalfX = axis === 'x' ? a : b;
      const boxHalfY = axis === 'x' ? b : a;

      const left = toScreenX(h - boxHalfX);
      const right = toScreenX(h + boxHalfX);
      const top = toScreenY(k + boxHalfY);
      const bottom = toScreenY(k - boxHalfY);

      ctx.fillRect(left, top, right - left, bottom - top);
      ctx.strokeRect(left, top, right - left, bottom - top);
      ctx.restore();
    }

    // 5. Draw Asymptotes
    if (showAsymptotes) {
      ctx.save();
      ctx.strokeStyle = '#ef4444'; // red-500
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 5]);

      const xSpan = Math.max(Math.abs(minX - h), Math.abs(maxX - h)) + 2;

      // Asymptote 1: slope +m
      const m1 = asymptoteSlopes[0];
      const p1_start = { x: h - xSpan, y: k - m1 * xSpan };
      const p1_end = { x: h + xSpan, y: k + m1 * xSpan };
      ctx.beginPath();
      ctx.moveTo(toScreenX(p1_start.x), toScreenY(p1_start.y));
      ctx.lineTo(toScreenX(p1_end.x), toScreenY(p1_end.y));
      ctx.stroke();

      // Asymptote 2: slope -m
      const m2 = asymptoteSlopes[1];
      const p2_start = { x: h - xSpan, y: k - m2 * xSpan };
      const p2_end = { x: h + xSpan, y: k + m2 * xSpan };
      ctx.beginPath();
      ctx.moveTo(toScreenX(p2_start.x), toScreenY(p2_start.y));
      ctx.lineTo(toScreenX(p2_end.x), toScreenY(p2_end.y));
      ctx.stroke();
      ctx.restore();
    }

    // 6. Draw Hyperbola Curves (Both Branches)
    ctx.save();
    ctx.strokeStyle = '#2563eb'; // blue-600
    ctx.lineWidth = 2.5;

    const tMax = 3.2; // parameter t in cosh(t), sinh(t)
    const dt = 0.04;

    if (axis === 'x') {
      // Right branch: x = h + a*cosh(t), y = k + b*sinh(t)
      ctx.beginPath();
      let first = true;
      for (let t = -tMax; t <= tMax; t += dt) {
        const hx = h + a * Math.cosh(t);
        const hy = k + b * Math.sinh(t);
        const sx = toScreenX(hx);
        const sy = toScreenY(hy);
        if (first) {
          ctx.moveTo(sx, sy);
          first = false;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();

      // Left branch: x = h - a*cosh(t), y = k + b*sinh(t)
      ctx.beginPath();
      first = true;
      for (let t = -tMax; t <= tMax; t += dt) {
        const hx = h - a * Math.cosh(t);
        const hy = k + b * Math.sinh(t);
        const sx = toScreenX(hx);
        const sy = toScreenY(hy);
        if (first) {
          ctx.moveTo(sx, sy);
          first = false;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();
    } else {
      // Top branch: y = k + a*cosh(t), x = h + b*sinh(t)
      ctx.beginPath();
      let first = true;
      for (let t = -tMax; t <= tMax; t += dt) {
        const hy = k + a * Math.cosh(t);
        const hx = h + b * Math.sinh(t);
        const sx = toScreenX(hx);
        const sy = toScreenY(hy);
        if (first) {
          ctx.moveTo(sx, sy);
          first = false;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();

      // Bottom branch: y = k - a*cosh(t), x = h + b*sinh(t)
      ctx.beginPath();
      first = true;
      for (let t = -tMax; t <= tMax; t += dt) {
        const hy = k - a * Math.cosh(t);
        const hx = h + b * Math.sinh(t);
        const sx = toScreenX(hx);
        const sy = toScreenY(hy);
        if (first) {
          ctx.moveTo(sx, sy);
          first = false;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();
    }
    ctx.restore();

    // 7. Draw Center Point (h, k)
    const centerSx = toScreenX(h);
    const centerSy = toScreenY(k);
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(centerSx, centerSy, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(`C(${h},${k})`, centerSx + 6, centerSy - 6);

    // 8. Draw Vertices A1, A2
    ctx.fillStyle = '#1d4ed8'; // blue-700
    vertices.forEach((v, idx) => {
      const vx = toScreenX(v.x);
      const vy = toScreenY(v.y);
      ctx.beginPath();
      ctx.arc(vx, vy, 4.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#1e3a8a';
      ctx.fillText(
        `A${idx + 1}(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`,
        vx + 6,
        vy - 6
      );
      ctx.fillStyle = '#1d4ed8';
    });

    // 9. Draw Foci F1, F2
    if (showFoci) {
      ctx.fillStyle = '#b91c1c'; // red-700
      foci.forEach((f, idx) => {
        const fx = toScreenX(f.x);
        const fy = toScreenY(f.y);
        ctx.beginPath();
        ctx.arc(fx, fy, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#991b1b';
        ctx.fillText(
          `F${idx + 1}(${f.x.toFixed(1)}, ${f.y.toFixed(1)})`,
          fx + 6,
          fy + 14
        );
        ctx.fillStyle = '#b91c1c';
      });
    }

    // 10. Draw Hover Inspection Point & Distance lines if hovering
    if (hoverCoord) {
      // Find point on hyperbola closest in t parameter
      const targetX = hoverCoord.x;
      const targetY = hoverCoord.y;

      // Project onto nearest branch
      let ptX = targetX;
      let ptY = targetY;

      if (axis === 'x') {
        const isRight = targetX >= h;
        const sign = isRight ? 1 : -1;
        const clampedX = Math.max(a, Math.abs(targetX - h));
        const computedX = h + sign * clampedX;
        const computedY =
          k +
          (targetY >= k ? 1 : -1) *
            b *
            Math.sqrt(Math.max(0, Math.pow(clampedX / a, 2) - 1));
        ptX = computedX;
        ptY = computedY;
      } else {
        const isTop = targetY >= k;
        const sign = isTop ? 1 : -1;
        const clampedY = Math.max(a, Math.abs(targetY - k));
        const computedY = k + sign * clampedY;
        const computedX =
          h +
          (targetX >= h ? 1 : -1) *
            b *
            Math.sqrt(Math.max(0, Math.pow(clampedY / a, 2) - 1));
        ptX = computedX;
        ptY = computedY;
      }

      const pSx = toScreenX(ptX);
      const pSy = toScreenY(ptY);

      // Distance to F1 and F2
      const distF1 = Math.hypot(ptX - foci[0].x, ptY - foci[0].y);
      const distF2 = Math.hypot(ptX - foci[1].x, ptY - foci[1].y);
      const diff = Math.abs(distF1 - distF2);

      // Draw dashed connector lines to foci
      ctx.save();
      ctx.strokeStyle = '#f59e0b'; // amber-500
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      ctx.moveTo(pSx, pSy);
      ctx.lineTo(toScreenX(foci[0].x), toScreenY(foci[0].y));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pSx, pSy);
      ctx.lineTo(toScreenX(foci[1].x), toScreenY(foci[1].y));
      ctx.stroke();

      // Point P
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(pSx, pSy, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Overlay text showing definition verification: |PF1 - PF2| = 2a
      ctx.fillStyle = '#0f172a';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(
        `P(${ptX.toFixed(2)}, ${ptY.toFixed(2)}) |PF1|-|PF2| = ${diff.toFixed(2)} (2a=${(2 * a).toFixed(2)})`,
        pSx + 8,
        pSy - 8
      );
      ctx.restore();
    }
  }, [
    scale,
    offset,
    axis,
    h,
    k,
    a,
    b,
    c,
    vertices,
    foci,
    asymptoteSlopes,
    showBox,
    showAsymptotes,
    showFoci,
    showEllipse,
    hoverCoord,
  ]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      draw();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Mouse drag & zoom handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;

      const originX = canvas.width / 2 + offset.x;
      const originY = canvas.height / 2 + offset.y;
      const mathX = (screenX - originX) / scale;
      const mathY = (originY - screenY) / scale;

      setHoverCoord({ x: mathX, y: mathY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoverCoord(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    setScale((prev) => Math.min(120, Math.max(12, prev * zoomFactor)));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging && e.touches.length === 1) {
      setOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleResetView = () => {
    setScale(36);
    setOffset({ x: -h * 36, y: k * 36 });
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col select-none">
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Visual Layer Toggles */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-xs pointer-events-auto text-xs font-medium text-slate-700">
          <button
            onClick={() => setShowAsymptotes(!showAsymptotes)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              showAsymptotes
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title={t.showAsymptotes}
          >
            <span className="w-2 h-0.5 border-t border-rose-500 border-dashed"></span>
            {t.showAsymptotes}
          </button>

          <button
            onClick={() => setShowBox(!showBox)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              showBox
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title={t.showBox}
          >
            <span className="w-2 h-2 border border-blue-400 border-dashed"></span>
            {t.showBox}
          </button>

          <button
            onClick={() => setShowFoci(!showFoci)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              showFoci
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title={t.showFoci}
          >
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            {t.showFoci}
          </button>

          <button
            onClick={() => setShowEllipse(!showEllipse)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
              showEllipse
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title={t.showEllipse}
          >
            {showEllipse ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {t.showEllipse}
          </button>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm p-1 rounded-lg border border-slate-200 shadow-xs pointer-events-auto">
          <button
            onClick={() => setScale((prev) => Math.min(120, prev * 1.2))}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title={t.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale((prev) => Math.max(12, prev * 0.8))}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title={t.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
            title={t.resetView}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="flex-1 w-full h-full relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full block touch-none"
        />
      </div>

      {/* Bottom Educational Micro-Legend */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-600 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-blue-600 inline-block"></span>
            {t.mainCurve}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 border-t border-red-500 border-dashed inline-block"></span>
            {t.asymptotes}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
            {t.foci} (c = {properties.c.toFixed(2)})
          </span>
          {showEllipse && (
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-0.5 border-t border-emerald-500 border-dashed inline-block"></span>
              {t.comparisonEllipse}
            </span>
          )}
        </div>
        <div className="text-slate-400 text-xs">
          {t.tip}
        </div>
      </div>
    </div>
  );
};
