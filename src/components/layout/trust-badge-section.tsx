"use client";

import { useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Data — 21 partner/mitra logos (user-provided logoipsum files)      */
/* ------------------------------------------------------------------ */

const ALL_LOGOS = [
  { src: "/logoipsum-427.png", alt: "Mitra 1" },
  { src: "/logoipsum-419.png", alt: "Mitra 2" },
  { src: "/logoipsum-409.png", alt: "Mitra 3" },
  { src: "/logoipsum-388.png", alt: "Mitra 4" },
  { src: "/logoipsum-385.png", alt: "Mitra 5" },
  { src: "/logoipsum-372.png", alt: "Mitra 6" },
  { src: "/logoipsum-393.png", alt: "Mitra 7" },
  { src: "/logoipsum-401.png", alt: "Mitra 8" },
  { src: "/logoipsum-410.png", alt: "Mitra 9" },
  { src: "/logoipsum-407.png", alt: "Mitra 10" },
  { src: "/logoipsum-413.png", alt: "Mitra 11" },
  { src: "/logoipsum-424.png", alt: "Mitra 12" },
  { src: "/logoipsum-428.png", alt: "Mitra 13" },
  { src: "/logoipsum-397.png", alt: "Mitra 14" },
  { src: "/logoipsum-374.png", alt: "Mitra 15" },
  { src: "/logoipsum-336.png", alt: "Mitra 16" },
  { src: "/logoipsum-327.png", alt: "Mitra 17" },
  { src: "/logoipsum-330.png", alt: "Mitra 18" },
  { src: "/logoipsum-247.png", alt: "Mitra 19" },
  { src: "/logoipsum-339.png", alt: "Mitra 20" },
  { src: "/logoipsum-343.png", alt: "Mitra 21" },
];

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#edf7e1",
  titleColor: "#1f422e",
  dividerColor: "#7aa259",
};

/* ------------------------------------------------------------------ */
/*  TrustBadgeSection                                                  */
/* ------------------------------------------------------------------ */

export function TrustBadgeSection() {
  // Randomize logo order on each mount
  const shuffledLogos = useMemo(() => {
    const arr = [...ALL_LOGOS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  // Duplicate for seamless infinite loop
  const logos = [...shuffledLogos, ...shuffledLogos, ...shuffledLogos];

  return (
    <section
      className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: C.bg }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title — centered */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight"
            style={{ fontSize: "36px", color: C.titleColor }}
          >
            Mitra Kami
          </h2>
          <div
            className="mt-4 mx-auto"
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: C.dividerColor,
              borderRadius: "2px",
            }}
          />
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full">
        {/* Left fade edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${C.bg}, transparent)`,
          }}
        />
        {/* Right fade edge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${C.bg}, transparent)`,
          }}
        />

        {/* Marquee Track — pauses on hover */}
        <div className="marquee-container group">
          <div className="marquee-track">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-5 md:px-7 shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
