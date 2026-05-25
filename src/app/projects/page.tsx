"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data — project portfolio (13 items = page 1: 12, page 2: 1)        */
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
  { id: 1,  projectType: PROJECT_TYPES[0], category: "PJU",            image: "/portfolio-1.jpg" },
  { id: 2,  projectType: PROJECT_TYPES[1], category: "Solar Cell",     image: "/portfolio-2.jpg" },
  { id: 3,  projectType: PROJECT_TYPES[2], category: "Penangkal Petir", image: "/portfolio-3.jpg" },
  { id: 4,  projectType: PROJECT_TYPES[3], category: "Baterai",        image: "/portfolio-4.jpg" },
  { id: 5,  projectType: PROJECT_TYPES[4], category: "PJU",            image: "/portfolio-5.jpg" },
  { id: 6,  projectType: PROJECT_TYPES[5], category: "Solar Cell",     image: "/portfolio-6.jpg" },
  { id: 7,  projectType: PROJECT_TYPES[0], category: "Penangkal Petir", image: "/portfolio-7.jpg" },
  { id: 8,  projectType: PROJECT_TYPES[3], category: "Baterai",        image: "/portfolio-8.jpg" },
  { id: 9,  projectType: PROJECT_TYPES[4], category: "PJU",            image: "/portfolio-9.jpg" },
  { id: 10, projectType: PROJECT_TYPES[2], category: "Solar Cell",     image: "/portfolio-10.jpg" },
  { id: 11, projectType: PROJECT_TYPES[5], category: "Penangkal Petir", image: "/portfolio-11.jpg" },
  { id: 12, projectType: PROJECT_TYPES[1], category: "Baterai",        image: "/portfolio-12.jpg" },
  { id: 13, projectType: PROJECT_TYPES[3], category: "Solar Cell",     image: "/portfolio-13.jpg" },
];

const FILTER_CATEGORIES = ["PJU", "Solar Cell", "Penangkal Petir", "Baterai"] as const;
type CategoryFilter = "Semua" | (typeof FILTER_CATEGORIES)[number];

const ITEMS_PER_PAGE = 12;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#edf7e1",
  titleColor: "#1f422e",
  dividerColor: "#7aa259",
  btnDefault: "#74c465",
  btnActive: "#1f422e",
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

  // Default: #74c465, Active or hovered (pressed): #1f422e
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
/*  Pagination Dots                                                    */
/* ------------------------------------------------------------------ */

function PaginationDots({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 py-8 md:py-10">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className="rounded-full transition-all duration-200"
          style={{
            width: currentPage === page ? "24px" : "8px",
            height: "8px",
            backgroundColor: currentPage === page ? C.dividerColor : "rgba(31, 66, 46, 0.2)",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ProjectsPage                                                       */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter projects
  const filtered =
    activeFilter === "Semua"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  // Paginate
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filter changes
  const handleFilterChange = (filter: CategoryFilter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <main className="relative w-full min-h-screen" style={{ backgroundColor: C.bg }}>
      {/* Hero — full-width from top edge, like homepage */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(280px, 45vw, 420px)" }}
      >
        {/* Background image */}
        <img
          src="/project-hero.jpg"
          alt="Project portfolio hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
        />

        {/* Title centered inside hero */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
          <h1
            className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight text-center"
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              color: "#f1f3f4",
              textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Portfolio Kami
          </h1>
        </div>

        {/* Gradient overlay at bottom for smooth transition */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "80px",
            background: `linear-gradient(to bottom, transparent, ${C.bg})`,
            zIndex: 2,
          }}
        />
      </section>

      {/* Portfolio content section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter row: 4 category buttons LEFT, "Lihat Semua" RIGHT */}
        <div className="flex items-center justify-between mt-4 mb-6 md:mb-8">
          {/* Category filters — left-aligned */}
          <div className="flex items-center gap-3 md:gap-4">
            {FILTER_CATEGORIES.map((cat) => (
              <FilterButton
                key={cat}
                active={activeFilter === cat}
                onClick={() => handleFilterChange(cat)}
              >
                {cat}
              </FilterButton>
            ))}
          </div>

          {/* Lihat Semua — right-aligned with arrow */}
          <FilterButton
            active={activeFilter === "Semua"}
            onClick={() => handleFilterChange("Semua")}
          >
            <span className="flex items-center gap-1">
              Lihat Semua
              <ChevronRight width={14} height={14} style={{ color: "inherit" }} />
            </span>
          </FilterButton>
        </div>
      </div>

      {/* Edge-to-edge photo grid — 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {paginatedProjects.map((project) => (
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
            {/* Hover overlay */}
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

      {/* Pagination dots */}
      <PaginationDots
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
