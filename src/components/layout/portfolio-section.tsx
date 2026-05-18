"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data — 8 sample projects                                           */
/* ------------------------------------------------------------------ */

interface Project {
  id: number;
  projectType: string;
  category: "PJU" | "Solar Cell" | "Penangkal Petir" | "Baterai";
  image: string;
}

const PROJECT_TYPES = [
  "Sector Pabrik",
  "Pergudangan & Logistic",
  "Perkantoran & Komersial",
  "Pertanian & Pedesaan",
  "Infrastruktur Public & Pemerintahan",
  "Kawasan Perumahan",
];

const PROJECTS: Project[] = [
  { id: 1, projectType: PROJECT_TYPES[0], category: "PJU", image: "/portfolio-1.jpg" },
  { id: 2, projectType: PROJECT_TYPES[1], category: "Solar Cell", image: "/portfolio-2.jpg" },
  { id: 3, projectType: PROJECT_TYPES[2], category: "Penangkal Petir", image: "/portfolio-3.jpg" },
  { id: 4, projectType: PROJECT_TYPES[3], category: "Baterai", image: "/portfolio-4.jpg" },
  { id: 5, projectType: PROJECT_TYPES[4], category: "PJU", image: "/portfolio-5.jpg" },
  { id: 6, projectType: PROJECT_TYPES[5], category: "Solar Cell", image: "/portfolio-6.jpg" },
  { id: 7, projectType: PROJECT_TYPES[0], category: "Penangkal Petir", image: "/portfolio-7.jpg" },
  { id: 8, projectType: PROJECT_TYPES[3], category: "Baterai", image: "/portfolio-8.jpg" },
];

const FILTER_CATEGORIES = ["PJU", "Solar Cell", "Penangkal Petir", "Baterai"] as const;
type CategoryFilter = "Semua" | (typeof FILTER_CATEGORIES)[number];

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#edf7e1",
  titleColor: "#1f422e",
  dividerColor: "#7aa259",
  btnDefault: "#74c465",
  btnActive: "#fac669",
  overlayHover: "rgba(31, 66, 46, 0.59)",
};

/* ------------------------------------------------------------------ */
/*  Text-only button with hover color change                            */
/* ------------------------------------------------------------------ */

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Color = active if active, else hover if hovered, else default
  const color = active || hovered ? C.btnActive : C.btnDefault;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer transition-colors duration-200"
      style={{
        backgroundColor: "transparent",
        color,
        border: "none",
        fontFamily: "var(--font-jakarta), sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  PortfolioSection                                                   */
/* ------------------------------------------------------------------ */

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("Semua");

  const filtered =
    activeFilter === "Semua"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      className="relative w-full pt-8 md:pt-10 lg:pt-12 pb-0"
      style={{ backgroundColor: C.bg }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-left">
          <h2
            className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight"
            style={{ fontSize: "36px", color: C.titleColor }}
          >
            Portfolio Kami
          </h2>
          <div
            className="mt-4"
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: C.dividerColor,
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Filter row: 4 category buttons LEFT, "Semua Project" RIGHT */}
        <div className="flex items-center justify-between mt-4 mb-6 md:mb-8">
          {/* Category filters — left-aligned */}
          <div className="flex items-center gap-3 md:gap-4">
            {FILTER_CATEGORIES.map((cat) => (
              <FilterButton
                key={cat}
                active={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </FilterButton>
            ))}
          </div>

          {/* Semua Project — right-aligned with arrow */}
          <FilterButton
            active={activeFilter === "Semua"}
            onClick={() => {
              setActiveFilter("Semua");
              /* TODO: navigate to project page — wait for user instruction */
            }}
          >
            <span className="flex items-center gap-1">
              Semua Project
              <ChevronRight width={14} height={14} style={{ color: "inherit" }} />
            </span>
          </FilterButton>
        </div>
      </div>

      {/* Edge-to-edge photo grid — no padding, no gap, no margin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="relative group overflow-hidden cursor-pointer"
            style={{ aspectRatio: "16/9" }}
            onClick={() => {
              /* TODO: navigate to project detail page — wait for user instruction */
            }}
          >
            <img
              src={project.image}
              alt={project.projectType}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover overlay — project type centered */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: C.overlayHover }}
            >
              <p
                className="font-[family-name:var(--font-jakarta)] font-semibold text-sm text-center px-4"
                style={{ color: "#fff" }}
              >
                {project.projectType}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
