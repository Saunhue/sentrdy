'use client';

import { useState, useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HERO_IMAGES = [
  '/hero-1.png',
  '/hero-2.png',
  '/hero-3.png',
  '/hero-4.jpg',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2075&auto=format&fit=crop',
];

const HERO_TEXTS = [
  'Solusi Energi Terbarukan',
  'Penerangan Jalan Tenaga Surya',
  'Proteksi Petir Profesional',
];

const IMAGE_INTERVAL_MS = 5000;
const TEXT_INTERVAL_MS = 2800;
const FADE_DURATION_MS = 500;

/* ------------------------------------------------------------------ */
/*  Scroll Indicator (smaller)                                         */
/* ------------------------------------------------------------------ */

function ScrollIndicator() {
  return (
    <div
      className="flex flex-col items-center gap-1.5"
      style={{ animation: 'heroBounce 2s ease-in-out infinite' }}
    >
      {/* Mouse shape — smaller */}
      <svg
        width="18"
        height="28"
        viewBox="0 0 26 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="24"
          height="38"
          rx="12"
          ry="12"
          stroke="rgba(241,243,244,0.6)"
          strokeWidth="2"
        />
        <line
          x1="13"
          y1="12"
          x2="13"
          y2="20"
          stroke="rgba(241,243,244,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ animation: 'heroScrollWheel 2s ease-in-out infinite' }}
        />
      </svg>
      <span
        className="text-[8px] tracking-[0.2em] uppercase"
        style={{
          color: 'rgba(241,243,244,0.5)',
          fontFamily: 'var(--font-jakarta), sans-serif',
          fontWeight: 500,
        }}
      >
        SCROLL
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection                                                        */
/* ------------------------------------------------------------------ */

type TextPhase = 'visible' | 'leaving' | 'entering';

export function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const textIndexRef = useRef(0);
  const [displayedText, setDisplayedText] = useState(HERO_TEXTS[0]);
  const [phase, setPhase] = useState<TextPhase>('visible');

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, IMAGE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate text — 3-phase animation
  useEffect(() => {
    const timer = setInterval(() => {
      // Phase 1: fade out downward (center → down)
      setPhase('leaving');

      // Phase 2: after fade out completes, swap text & prepare enter
      setTimeout(() => {
        textIndexRef.current = (textIndexRef.current + 1) % HERO_TEXTS.length;
        setDisplayedText(HERO_TEXTS[textIndexRef.current]);
        // Snap to top instantly (no transition) — opacity 0, translateY(-20px)
        setPhase('entering');

        // Phase 3: next frame, trigger fade in from top to center
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase('visible');
          });
        });
      }, FADE_DURATION_MS);
    }, TEXT_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // Compute text transform + opacity based on phase
  // visible: center, full opacity (transition animates to here)
  // leaving: slides down + fades out (transition animates away)
  // entering: snapped to top, invisible, NO transition
  const textStyle = {
    transition: phase === 'entering'
      ? 'none'
      : `opacity ${FADE_DURATION_MS}ms ease-in-out, transform ${FADE_DURATION_MS}ms ease-in-out`,
    opacity: phase === 'visible' ? 1 : 0,
    transform: phase === 'visible'
      ? 'translateY(0)'
      : phase === 'leaving'
        ? 'translateY(20px)'
        : 'translateY(-20px)',
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Layer 1: Background images */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === imageIndex ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Layer 2: Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      />

      {/* Layer 3: Cycling text — 3-phase animation */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 3 }}
      >
        <div className="text-center" style={textStyle}>
          <h1
            style={{
              color: '#f1f3f4',
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {displayedText}
          </h1>
        </div>
      </div>

      {/* Layer 4: Scroll indicator */}
      <div
        className="absolute left-1/2"
        style={{
          zIndex: 4,
          bottom: '28px',
          transform: 'translateX(-50%)',
        }}
      >
        <ScrollIndicator />
      </div>
    </section>
  );
}
