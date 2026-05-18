"use client";

import { SquareCheckBig } from "lucide-react";

const reasons = [
  {
    title: "Produk Original & Bersertifikat",
    description:
      "Menjamin kualitas perangkat dengan standar nasional SNI dan dukungan TKDN pada setiap unit komponen kami.",
  },
  {
    title: "Solusi Terlengkap & Terintegrasi",
    description:
      "Penyedia satu pintu untuk kebutuhan Solar Cell, PJU, Baterai Industri, hingga Sistem Penangkal Petir.",
  },
  {
    title: "Spesialis Sektor Industri & Swasta",
    description:
      "Berpengalaman dalam menyediakan dan mengelola sistem energi serta proteksi yang handal untuk skala operasional bisnis.",
  },
  {
    title: "Proses Transparan & Profesional",
    description:
      "Layanan konsultasi ahli dan pemberian penawaran harga resmi yang jelas, transparan, serta dapat dipertanggungjawabkan.",
  },
  {
    title: "Dukungan Teknisi Berpengalaman",
    description:
      "Jaminan instalasi perangkat yang presisi, aman, dan sesuai dengan standar teknis di lapangan oleh tenaga ahli kami.",
  },
  {
    title: "Layanan Purna Jual Terukur",
    description:
      "Menyediakan opsi kontrak pemeliharaan berkala untuk memastikan stabilitas dan kinerja sistem Anda dalam jangka panjang.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#eceed6" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title — centered */}
        <div className="mb-12 md:mb-16 text-center">
          <h2
            className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight"
            style={{ fontSize: "36px", color: "#1f422e" }}
          >
            Kenapa Harus Kami
          </h2>
          {/* Green divider line */}
          <div
            className="mx-auto mt-4"
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "#7aa259",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-x-10 md:gap-y-10">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col text-left">
              {/* Icon + Title row — left aligned */}
              <div className="flex items-start gap-3" style={{ marginBottom: '1px' }}>
                <div className="flex-shrink-0 mt-0.5">
                  <SquareCheckBig
                    width={36}
                    height={36}
                    style={{ color: "#fac669" }}
                    strokeWidth={2.2}
                  />
                </div>
                <h3
                  className="font-[family-name:var(--font-montserrat)] font-semibold leading-snug pt-0.5"
                  style={{ fontSize: "17px", color: "#1f422e" }}
                >
                  {reason.title}
                </h3>
              </div>
              {/* Description — left aligned, tight to title */}
              <p
                className="leading-relaxed font-[family-name:var(--font-jakarta)] pl-[48px]"
                style={{ fontSize: "14px", color: "#555555" }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
