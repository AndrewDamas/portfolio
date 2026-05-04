import { useEffect, useRef, useCallback } from 'react';
import { FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { SiUpwork } from 'react-icons/si';
import socials from '../data/socials';
import styles from './Hero.module.css';

// Ripple wave simulation using a height-map grid
// Two alternating buffers (current / previous) — standard shallow-water equation
const DAMPING = 0.985;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buf1Ref = useRef<Float32Array | null>(null);
  const buf2Ref = useRef<Float32Array | null>(null);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Compute canvas dimensions based on device pixel ratio
  const initBuffers = useCallback((canvas: HTMLCanvasElement) => {
    const w = canvas.width;
    const h = canvas.height;
    colsRef.current = w;
    rowsRef.current = h;
    const size = w * h;
    buf1Ref.current = new Float32Array(size);
    buf2Ref.current = new Float32Array(size);
  }, []);

  const addRipple = useCallback((x: number, y: number, force = 512) => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const buf = buf1Ref.current;
    if (!buf) return;
    const radius = 4;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy <= radius * radius) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            buf[ny * cols + nx] += force;
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Read accent color from CSS variable to tint ripples
    const accentRaw = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#b85c38';

    function hexToRgb(hex: string): [number, number, number] {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    }
    const [ar, ag, ab] = hexToRgb(accentRaw.startsWith('#') ? accentRaw : '#b85c38');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(container.clientWidth * dpr);
      canvas.height = Math.floor(container.clientHeight * dpr);
      canvas.style.width = container.clientWidth + 'px';
      canvas.style.height = container.clientHeight + 'px';
      initBuffers(canvas);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Simulate + render loop
    const tick = () => {
      const cols = colsRef.current;
      const rows = rowsRef.current;
      const cur = buf1Ref.current;
      const prev = buf2Ref.current;
      if (!cur || !prev || cols === 0 || rows === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Propagate wave equation: new = 2*cur - prev + (avg_neighbors - cur) * 2
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const val =
            (cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols]) / 2 -
            prev[i];
          prev[i] = val * DAMPING;
        }
      }
      // Swap
      buf1Ref.current = prev;
      buf2Ref.current = cur;

      // Render
      const imageData = ctx.createImageData(cols, rows);
      const data = imageData.data;
      const newBuf = buf1Ref.current;

      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          // Gradient from neighbors → slope ≈ normal direction
          const dx2 = newBuf[i + 1] - newBuf[i - 1];
          const dy2 = newBuf[i + cols] - newBuf[i - cols];
          const slope = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          // Map slope to alpha — subtle tint
          const alpha = Math.min(slope * 0.6, 80);
          const pi = i * 4;
          data[pi] = ar;
          data[pi + 1] = ag;
          data[pi + 2] = ab;
          data[pi + 3] = alpha;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // Input → ripple
    const toCanvasCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = canvas.width / rect.width;
      return {
        x: Math.floor((clientX - rect.left) * dpr),
        y: Math.floor((clientY - rect.top) * dpr),
      };
    };

    let lastX = -1;
    let lastY = -1;
    const onMouseMove = (e: MouseEvent) => {
      const { x, y } = toCanvasCoords(e.clientX, e.clientY);
      if (Math.abs(x - lastX) + Math.abs(y - lastY) > 4) {
        addRipple(x, y, 256);
        lastX = x;
        lastY = y;
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      const { x, y } = toCanvasCoords(e.clientX, e.clientY);
      addRipple(x, y, 768);
    };
    const onTouchMove = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const { x, y } = toCanvasCoords(e.touches[i].clientX, e.touches[i].clientY);
        addRipple(x, y, 384);
      }
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mousedown', onMouseDown, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // Subtle ambient drips while idle
    const drip = () => {
      const cols = colsRef.current;
      const rows = rowsRef.current;
      if (cols > 0 && rows > 0) {
        const x = Math.floor(Math.random() * (cols - 4)) + 2;
        const y = Math.floor(Math.random() * (rows - 4)) + 2;
        addRipple(x, y, 128);
      }
    };
    const dripInterval = setInterval(drip, 1200);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(dripInterval);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, [initBuffers, addRipple]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={`${styles.hero} section`}>
      <div ref={containerRef} className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      <div className={styles.content}>
        <p className={styles.greeting}>Hi, I'm</p>
        <h1 className={styles.name}>Andrew Damas</h1>
        <p className={styles.title}>Full Stack Developer</p>
        <p className={styles.tagline}>
          I craft elegant, performant web experiences — from pixel-perfect UIs to
          robust, scalable backends.
        </p>

        <div className={styles.ctas}>
          <button className="btn btn-primary" onClick={scrollToProjects}>
            View My Work <FiArrowDown size={15} />
          </button>

          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={socials.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="Upwork"
          >
            <SiUpwork size={16} />
          </a>
        </div>
      </div>

      <button className={styles.scrollHint} onClick={scrollToProjects} aria-label="Scroll down">
        <FiArrowDown size={20} />
      </button>
    </section>
  );
}
