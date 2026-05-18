"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    short: "Permintaan",
    title: "Permintaan (Inquiry)",
    description:
      "Pelanggan mengajukan permintaan kebutuhan barang dengan melampirkan spesifikasi teknis, jumlah unit, serta data profil perusahaan yang lengkap untuk kami tindak lanjuti.",
  },
  {
    short: "Penawaran",
    title: "Penawaran (Quotation)",
    description:
      "Kami menerbitkan penawaran harga resmi (Quotation) berdasarkan spesifikasi yang diminta, diikuti dengan proses negosiasi untuk mencapai kesepakatan terbaik bagi kedua belah pihak.",
  },
  {
    short: "Konsultasi",
    title: "Konsultasi (Consultation)",
    description:
      "Diskusi teknis untuk memastikan produk yang dipilih (PJU, Solar Cell, Baterai, maupun Penangkal Petir) sudah sesuai dengan kebutuhan operasional dan kondisi di lokasi.",
  },
  {
    short: "Pembelian",
    title: "Pembelian (Procurement)",
    description:
      "Proses pengadaan dan penyediaan unit barang berkualitas tinggi (SNI & TKDN) yang telah disepakati untuk menjamin ketersediaan stok tepat waktu.",
  },
  {
    short: "Pemasangan",
    title: "Pemasangan (Installation)",
    description:
      "Layanan instalasi unit oleh tenaga teknis ahli, khusus untuk pemasangan unit UPS/Baterai dan lampu PJU (pemasangan teknis non-sipil/tanpa pengecoran).",
  },
  {
    short: "Pemeliharaan",
    title: "Pemeliharaan (Maintenance)",
    description:
      "Dukungan layanan perawatan sistem secara berkala untuk menjaga performa perangkat dalam jangka panjang, yang pelaksanaannya disesuaikan berdasarkan kontrak kerja yang disepakati.",
  },
];

/* ------------------------------------------------------------------ */
/*  Colors (FINAL — all revisions applied)                             */
/* ------------------------------------------------------------------ */

const C = {
  // Background overlay: #1f422e @ 61%
  overlayBg: "rgba(31, 66, 46, 0.61)",
  // Button default: #9fc53e @ 67% (SWAPPED from previous)
  btnDefault: "rgba(159, 197, 62, 0.67)",
  // Button hover: #1f422e @ 67% + stroke
  btnHover: "rgba(31, 66, 46, 0.67)",
  // Button active: #1f422e solid (SWAPPED from previous)
  btnActive: "#1f422e",
  // Hover stroke
  hoverStroke: "rgba(159, 197, 62, 0.5)",
  // Text colors (SWAPPED to match button bg swap)
  textDefault: "#173422",
  textHover: "#eceed6",
  textActive: "#eceed6",
  // Arrow — soft green
  arrow: "#e2eec5",
};

/* ------------------------------------------------------------------ */
/*  OurProcessSection                                                  */
/* ------------------------------------------------------------------ */

export function OurProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = STEPS[activeIndex];

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-process.webp')",
          zIndex: 0,
        }}
      />

      {/* Overlay: #1f422e @ 61% */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: C.overlayBg, zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-8 md:mb-10 text-left">
          <h2
            className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight"
            style={{ fontSize: "36px", color: "#f6f7eb" }}
          >
            Proses Kami
          </h2>
          <div
            className="mt-4"
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "#bdbeab",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Step Buttons — flex-wrap for all dimensions */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-2">
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            const isActive = i === activeIndex;

            return (
              <StepButtonWithArrow
                key={i}
                step={step}
                isActive={isActive}
                onClick={() => setActiveIndex(i)}
                isLast={isLast}
              />
            );
          })}
        </div>

        {/* Description panel: #1f422e @ 84% */}
        <div
          className="mt-8 md:mt-10 p-5 md:p-6 rounded-lg transition-all duration-300"
          style={{ backgroundColor: "rgba(31, 66, 46, 0.84)" }}
        >
          <h3
            className="font-[family-name:var(--font-montserrat)] font-semibold leading-snug mb-3"
            style={{ fontSize: "20px", color: "#f4f6e2" }}
          >
            {activeStep.title}
          </h3>
          <p
            className="leading-relaxed font-[family-name:var(--font-jakarta)]"
            style={{ fontSize: "14px", color: "#f4f6e2" }}
          >
            {activeStep.description}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Step Button + Arrow (inline component)                             */
/* ------------------------------------------------------------------ */

function StepButtonWithArrow({
  step,
  isActive,
  onClick,
  isLast,
}: {
  step: (typeof STEPS)[number];
  isActive: boolean;
  onClick: () => void;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const state = isActive ? "active" : hovered ? "hover" : "default";

  // SWAPPED: default is now green, active is now dark
  const bgStyle =
    state === "active"
      ? { backgroundColor: C.btnActive, border: "none" }
      : state === "hover"
        ? { backgroundColor: C.btnHover, border: `1px solid ${C.hoverStroke}` }
        : { backgroundColor: C.btnDefault, border: "none" };

  const textColor =
    state === "active"
      ? C.textActive
      : state === "hover"
        ? C.textHover
        : C.textDefault;

  return (
    <div className="flex items-center shrink-0">
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center justify-center px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200 cursor-pointer"
        style={{
          ...bgStyle,
          color: textColor,
          fontFamily: "var(--font-jakarta), sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "4px",
          whiteSpace: "nowrap",
        }}
      >
        {step.short}
      </button>
      {/* Arrow — visible on ALL dimensions, strokeWidth 3.7, marginLeft 4px */}
      {!isLast && (
        <ChevronRight
          width={14}
          height={14}
          strokeWidth={3.7}
          style={{ color: C.arrow, flexShrink: 0, marginLeft: "4px" }}
        />
      )}
    </div>
  );
}
