"use client";

import { Building2, CheckCircle, Eye, Target, Lightbulb, Handshake } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#eceed6",
  titleColor: "#1e412d",       // Darkened from #1f422e for 9.61:1 contrast on #eceed6
  textColor: "#4e4e4e",       // Darkened from #555555 for 7.04:1 contrast on #eceed6
  dividerColor: "#7aa259",
  mottoColor: "#fac669",
  vectorColor: "rgba(122, 162, 89, 0.15)", // 85% transparent
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const MISI_ITEMS = [
  {
    icon: CheckCircle,
    title: "Penyediaan Produk Berkualitas Tinggi",
    desc: "Menghadirkan perangkat energi surya, baterai, dan penangkal petir yang bersertifikasi SNI, TKDN, serta standar internasional untuk menjamin keamanan dan efisiensi maksimal.",
  },
  {
    icon: Target,
    title: "Layanan Profesional Ujung ke Ujung",
    desc: "Memberikan dukungan menyeluruh mulai dari konsultasi ahli, perencanaan desain, instalasi teknis yang presisi, hingga layanan purna jual nasional.",
  },
  {
    icon: Lightbulb,
    title: "Optimasi Efisiensi Operasional",
    desc: "Membantu sektor industri, pelaku usaha, dan masyarakat dalam mengurangi biaya energi jangka panjang melalui pemanfaatan teknologi energi bersih.",
  },
  {
    icon: Eye,
    title: "Edukasi & Transisi Energi",
    desc: "Aktif mendorong percepatan bauran energi nasional dan mengedukasi masyarakat mengenai pentingnya penggunaan energi ramah lingkungan demi masa depan yang lebih hijau.",
  },
  {
    icon: Handshake,
    title: "Kemitraan Strategis Berkelanjutan",
    desc: "Membangun kolaborasi jangka panjang dengan pemerintah, swasta, dan produsen teknologi global untuk menghadirkan solusi energi dan proteksi terbaik di seluruh pelosok Nusantara.",
  },
];

/* ------------------------------------------------------------------ */
/*  AboutUsPage                                                        */
/* ------------------------------------------------------------------ */

export default function AboutUsPage() {
  return (
    <main className="relative w-full min-h-screen" style={{ backgroundColor: C.bg }}>
      {/* Background vector — bottom right, behind all text */}
      <div className="fixed bottom-0 right-0 pointer-events-none" style={{ zIndex: 0, width: "60vw", height: "33.33vh" }}>
        <svg
          viewBox="0 0 600 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMaxYMax meet"
        >
          {/* Semi-transparent warehouse/office building */}
          {/* Main building body */}
          <rect x="80" y="100" width="350" height="200" rx="4" fill={C.vectorColor} />
          {/* Roof */}
          <path d="M60 100 L255 30 L450 100 Z" fill={C.vectorColor} />
          {/* Door */}
          <rect x="220" y="200" width="60" height="100" rx="2" fill="rgba(122, 162, 89, 0.08)" />
          {/* Windows row 1 */}
          <rect x="110" y="130" width="40" height="35" rx="2" fill="rgba(122, 162, 89, 0.08)" />
          <rect x="170" y="130" width="40" height="35" rx="2" fill="rgba(122, 162, 89, 0.08)" />
          <rect x="290" y="130" width="40" height="35" rx="2" fill="rgba(122, 162, 89, 0.08)" />
          <rect x="350" y="130" width="40" height="35" rx="2" fill="rgba(122, 162, 89, 0.08)" />
          {/* Windows row 2 */}
          <rect x="110" y="185" width="40" height="35" rx="2" fill="rgba(122, 162, 89, 0.08)" />
          <rect x="350" y="185" width="40" height="35" rx="2" fill="rgba(122, 162, 89, 0.08)" />
          {/* Solar panel on roof */}
          <rect x="160" y="55" width="80" height="6" rx="1" fill="rgba(122, 162, 89, 0.2)" />
          <rect x="260" y="55" width="80" height="6" rx="1" fill="rgba(122, 162, 89, 0.2)" />
          {/* Solar panel stands */}
          <line x1="200" y1="61" x2="200" y2="70" stroke="rgba(122, 162, 89, 0.15)" strokeWidth="1.5" />
          <line x1="300" y1="61" x2="300" y2="70" stroke="rgba(122, 162, 89, 0.15)" strokeWidth="1.5" />
          {/* Second smaller building (warehouse section) */}
          <rect x="440" y="160" width="120" height="140" rx="4" fill={C.vectorColor} />
          <path d="M430 160 L500 120 L570 160 Z" fill={C.vectorColor} />
          {/* Warehouse door (larger) */}
          <rect x="470" y="210" width="60" height="90" rx="2" fill="rgba(122, 162, 89, 0.06)" />
          {/* Lightning rod on main building */}
          <line x1="255" y1="30" x2="255" y2="10" stroke="rgba(122, 162, 89, 0.25)" strokeWidth="1.5" />
          <circle cx="255" cy="8" r="3" fill="rgba(122, 162, 89, 0.2)" />
          {/* Ground line */}
          <line x1="40" y1="300" x2="580" y2="300" stroke="rgba(122, 162, 89, 0.1)" strokeWidth="1" />
        </svg>
      </div>

      {/* Content — above vector */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Top spacer for fixed header */}
        <div className="h-28 md:h-32" />

        {/* Hero section — page title */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-8 md:pt-12 pb-12 md:pb-16">
          <h1
            className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight"
            style={{ fontSize: "36px", color: C.titleColor }}
          >
            Solusi Terpadu Energi Terbarukan
            <br />
            dan Sistem Proteksi Infrastruktur
          </h1>
          <div
            className="mt-5 mx-auto"
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: C.dividerColor,
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Main description paragraph */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <p
            className="font-[family-name:var(--font-jakarta)] leading-relaxed text-center mb-6"
            style={{ fontSize: "15px", color: C.textColor }}
          >
            Sentradaya hadir sebagai mitra strategis terkemuka di Indonesia yang berfokus pada penyediaan solusi energi baru terbarukan dan sistem keamanan infrastruktur terpadu. Kami mengintegrasikan teknologi ramah lingkungan melalui pemanfaatan Pembangkit Listrik Tenaga Surya (PLTS), Penerangan Jalan Umum (PJU) Solar Cell, sistem penyimpanan energi (Baterai & UPS), hingga perlindungan aset melalui sistem penangkal petir modern.
          </p>
          <p
            className="font-[family-name:var(--font-jakarta)] leading-relaxed text-center"
            style={{ fontSize: "15px", color: C.textColor }}
          >
            Dengan komitmen kuat terhadap percepatan transisi energi bersih nasional, DBSN menghadirkan layanan profesional mulai dari tahap konsultasi teknis, desain sistem yang presisi, pengadaan perangkat berstandar internasional, hingga instalasi dan pemeliharaan berkala. Didukung oleh sertifikasi SNI dan pemenuhan standar TKDN, solusi kami dirancang untuk memberikan efisiensi operasional bagi sektor industri, komersial, pemerintah, hingga agrikultur, sekaligus memastikan investasi energi Anda berjalan optimal, aman, dan berkelanjutan dalam jangka panjang.
          </p>
        </div>

        {/* Visi section */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="text-center mb-4">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight inline-flex items-center gap-2"
              style={{ fontSize: "24px", color: C.titleColor }}
            >
              <Eye className="w-6 h-6" style={{ color: C.dividerColor }} />
              Visi
            </h2>
          </div>
          <div className="relative mx-auto max-w-2xl text-center p-6 rounded-lg" style={{ backgroundColor: "rgba(122, 162, 89, 0.08)" }}>
            <p
              className="font-[family-name:var(--font-jakarta)] leading-relaxed italic"
              style={{ fontSize: "15px", color: C.textColor }}
            >
              &ldquo;Menjadi perusahaan penyedia solusi energi terbarukan dan sistem proteksi infrastruktur terkemuka di Indonesia yang menghadirkan inovasi teknologi berkualitas, aman, dan berkelanjutan untuk mendukung ketahanan energi nasional serta kesejahteraan masyarakat.&rdquo;
            </p>
          </div>
        </div>

        {/* Misi section */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="text-center mb-8">
            <h2
              className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight inline-flex items-center gap-2"
              style={{ fontSize: "24px", color: C.titleColor }}
            >
              <Target className="w-6 h-6" style={{ color: C.dividerColor }} />
              Misi
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {MISI_ITEMS.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className="flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(122, 162, 89, 0.15)",
                  }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: C.dividerColor }}
                  />
                </div>
                <div>
                  <h3
                    className="font-[family-name:var(--font-jakarta)] font-semibold mb-1"
                    style={{ fontSize: "15px", color: C.titleColor }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-jakarta)] leading-relaxed"
                    style={{ fontSize: "14px", color: C.textColor }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motto section */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="text-center">
            <p
              className="font-[family-name:var(--font-montserrat)] font-bold tracking-wide"
              style={{ fontSize: "20px", color: C.mottoColor }}
            >
              &ldquo;Inovasi Energi Hijau, Proteksi Infrastruktur Terpercaya.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
