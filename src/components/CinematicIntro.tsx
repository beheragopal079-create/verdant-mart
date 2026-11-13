import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { VerdantCartEmblem, VerdantFullLockup } from './VerdantEmblem';
import { introSound } from '../utils/sound';

interface CinematicIntroProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: 'emerald' | 'gold';
}

interface LightningBolt {
  points: Array<{ x: number; y: number }>;
  branches: Array<Array<{ x: number; y: number }>>;
}

function buildLightningPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  displace: number
): Array<{ x: number; y: number }> {
  if (displace < 8) {
    return [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ];
  }
  const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
  const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;
  const left = buildLightningPath(x1, y1, midX, midY, displace * 0.54);
  const right = buildLightningPath(midX, midY, x2, y2, displace * 0.54);
  return [...left.slice(0, -1), ...right];
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'darkness' | 'thunder' | 'logo' | 'message' | 'expand'>('darkness');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const completedRef = useRef(false);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    introSound.stop();
    try {
      sessionStorage.setItem('verdant_intro_seen_v1', '1');
    } catch {
      // ignore storage errors
    }
    onComplete();
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setPhase('message');
      const reducedTimer = window.setTimeout(finishIntro, 450);
      return () => window.clearTimeout(reducedTimer);
    }

    // Total ~3.1 seconds across 5 choreographed scenes
    const t1 = window.setTimeout(() => setPhase('thunder'), 380);
    const t2 = window.setTimeout(() => setPhase('logo'), 980);
    const t3 = window.setTimeout(() => setPhase('message'), 1680);
    const t4 = window.setTimeout(() => setPhase('expand'), 2500);
    const t5 = window.setTimeout(finishIntro, 3120);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, []);

  // Canvas particle + emerald lightning + golden-green energy ring renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let animId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const particles: Particle[] = Array.from({ length: 48 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.45,
      vy: -0.2 - Math.random() * 0.5,
      size: 1 + Math.random() * 2.2,
      alpha: 0.2 + Math.random() * 0.55,
      hue: Math.random() > 0.35 ? 'emerald' : 'gold',
    }));

    const buildBolts = (): LightningBolt[] => {
      const cx = w() * 0.5;
      const cy = h() * 0.43;
      const leftMain = buildLightningPath(0, h() * 0.15, cx - 20, cy, 90);
      const rightMain = buildLightningPath(w(), h() * 0.18, cx + 20, cy, 90);
      const leftBranch = buildLightningPath(w() * 0.18, h() * 0.25, w() * 0.32, h() * 0.58, 45);
      const rightBranch = buildLightningPath(w() * 0.82, h() * 0.28, w() * 0.68, h() * 0.6, 45);
      return [
        { points: leftMain, branches: [leftBranch] },
        { points: rightMain, branches: [rightBranch] },
      ];
    };

    let bolts = buildBolts();
    let lastBoltRefresh = 0;
    const startTime = performance.now();

    const drawPolyline = (pts: Array<{ x: number; y: number }>, width: number, alpha: number, color: string) => {
      if (pts.length < 2) return;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = alpha;
      ctx.shadowColor = '#5BF58A';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();
    };

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, w(), h());

      // Floating emerald & gold particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h() + 10;
          p.x = Math.random() * w();
        }
        if (p.x < -10) p.x = w() + 10;
        if (p.x > w() + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.alpha * (elapsed > 2.6 ? Math.max(0, 1 - (elapsed - 2.6) * 2) : 1);
        ctx.fillStyle = p.hue === 'emerald' ? '#70F396' : '#E7CA6E';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Scene 2: Emerald lightning bolts (0.38s -> 1.25s)
      if (elapsed >= 0.38 && elapsed <= 1.35) {
        if (now - lastBoltRefresh > 110) {
          bolts = buildBolts();
          lastBoltRefresh = now;
        }
        const boltWindow = elapsed < 0.7 ? (elapsed - 0.38) / 0.32 : Math.max(0, 1 - (elapsed - 0.7) / 0.65);
        for (const bolt of bolts) {
          drawPolyline(bolt.points, 3.2, boltWindow * 0.75, '#46E87B');
          drawPolyline(bolt.points, 1.3, boltWindow * 0.95, '#E9FFE8');
          for (const branch of bolt.branches) {
            drawPolyline(branch, 1.5, boltWindow * 0.45, '#46E87B');
          }
        }
      }

      // Reflective floor ring (0.6s -> 2.8s)
      if (elapsed >= 0.55) {
        const ringAlpha =
          elapsed < 1.0
            ? (elapsed - 0.55) / 0.45
            : elapsed > 2.5
            ? Math.max(0, 1 - (elapsed - 2.5) / 0.5)
            : 1;
        const cx = w() * 0.5;
        const floorY = Math.min(h() * 0.83, h() * 0.5 + 210);
        const rx = Math.min(w() * 0.38, 320);
        const ry = 22;

        ctx.save();
        ctx.globalAlpha = ringAlpha * 0.8;
        ctx.beginPath();
        ctx.ellipse(cx, floorY, rx, ry, 0, 0, Math.PI * 2);
        const grad = ctx.createLinearGradient(cx - rx, floorY, cx + rx, floorY);
        grad.addColorStop(0, 'rgba(72, 232, 123, 0.05)');
        grad.addColorStop(0.25, 'rgba(134, 244, 145, 0.85)');
        grad.addColorStop(0.5, 'rgba(244, 217, 128, 0.95)');
        grad.addColorStop(0.75, 'rgba(134, 244, 145, 0.85)');
        grad.addColorStop(1, 'rgba(72, 232, 123, 0.05)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#70F396';
        ctx.shadowBlur = 22;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleToggleSound = () => {
    if (!soundEnabled) {
      const ok = introSound.playElectricReveal();
      setSoundEnabled(ok);
    } else {
      introSound.stop();
      setSoundEnabled(false);
    }
  };

  const showRing = phase === 'thunder' || phase === 'logo' || phase === 'message' || phase === 'expand';
  const showEmblem = phase === 'logo' || phase === 'message' || phase === 'expand';
  const showMessage = phase === 'message' || phase === 'expand';
  const isExpanding = phase === 'expand';

  return (
    <div
      role="dialog"
      aria-label="VERDANT MARKET Brand Introduction"
      aria-modal="true"
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-opacity duration-500 ease-out ${
        isExpanding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 44%, #103226 0%, #071913 42%, #020605 100%)',
      }}
    >
      {/* Atmospheric subtle floor sheen */}
      <div
        className="absolute inset-x-0 bottom-0 h-[34vh] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(22, 74, 48, 0.25) 0%, rgba(10, 32, 23, 0.06) 60%, transparent 100%)',
        }}
      />

      {/* Particle & lightning canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Top Controls: Audio toggle + Skip Intro */}
      <div className="absolute top-5 inset-x-5 sm:top-7 sm:inset-x-8 z-30 flex items-center justify-between">
        <button
          type="button"
          onClick={handleToggleSound}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-sm border border-[#A8B99A]/30 bg-[#0A1E17]/75 text-[#F8F6EF]/90 hover:text-white hover:border-[#E5C97B]/60 text-xs font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
          aria-label={soundEnabled ? 'Mute electric reveal sound' : 'Play electric reveal sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#70F396]" /> : <VolumeX className="w-4 h-4 text-[#A8B99A]" />}
          <span>{soundEnabled ? 'Sound On' : 'Enable Sound'}</span>
        </button>

        <button
          type="button"
          onClick={finishIntro}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-sm border border-[#F8F6EF]/25 bg-[#0A1E17]/80 text-[#F8F6EF] hover:bg-[#173D32] hover:border-[#E5C97B]/70 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-2xl">
        {/* Golden-Green Energy Halo Ring */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: '1000px' }}
        >
          <div
            aria-hidden="true"
            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full pointer-events-none transition-all"
            style={{
              border: '2px solid rgba(232, 201, 108, 0.88)',
              boxShadow:
                '0 0 38px rgba(108, 240, 134, 0.55), inset 0 0 28px rgba(232, 201, 108, 0.35)',
              transform: isExpanding
                ? 'scale(11)'
                : showRing
                ? 'scale(1)'
                : 'scale(0.18)',
              opacity: isExpanding ? 0 : showRing ? 1 : 0,
              transitionDuration: isExpanding ? '620ms' : '480ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Secondary subtle emerald aura ring */}
          <div
            aria-hidden="true"
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none transition-all"
            style={{
              background:
                'radial-gradient(circle, rgba(96,240,132,0.18) 0%, rgba(23,61,50,0.08) 55%, transparent 72%)',
              transform: isExpanding ? 'scale(9)' : showRing ? 'scale(1)' : 'scale(0.3)',
              opacity: isExpanding ? 0 : showRing ? 1 : 0,
              transitionDuration: '520ms',
            }}
          />

          {/* Scene 3: 3D Metallic Cart & Fresh Produce Emblem */}
          <div
            className="relative z-10 transition-all"
            style={{
              transform: showEmblem
                ? 'translateY(0) scale(1) rotateX(0deg)'
                : 'translateY(16px) scale(0.74) rotateX(18deg)',
              opacity: showEmblem ? 1 : 0,
              transitionDuration: '580ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              filter: 'drop-shadow(0 12px 32px rgba(92, 232, 128, 0.34))',
            }}
          >
            <VerdantCartEmblem
              variant="metallic"
              className="w-44 h-36 sm:w-56 sm:h-44"
            />
          </div>
        </div>

        {/* Scene 3 & 4: Brand Lettering with Light Sweep + Tagline */}
        <div
          className="relative mt-1 sm:mt-2 overflow-hidden px-4 py-2 transition-all"
          style={{
            opacity: showMessage ? 1 : 0,
            transform: showMessage ? 'translateY(0)' : 'translateY(12px)',
            transitionDuration: '480ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <VerdantFullLockup />

          {/* Dramatic light sweep across lettering */}
          {showMessage && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-light-sweep"
            />
          )}
        </div>
      </div>
    </div>
  );
};
