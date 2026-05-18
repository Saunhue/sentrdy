"use client";

import Image from "next/image";

const certifications = [
  {
    title: "Sertifikasi SNI (Standar Nasional Indonesia)",
    description:
      "Jaminan keamanan teknis dan kualitas mutu pada setiap perangkat kami, memastikan sistem bekerja optimal dan aman sesuai standar kelistrikan yang berlaku di Indonesia.",
    logo: "/logo-sni.png",
    logoAlt: "Logo SNI",
  },
  {
    title: "Sertifikasi TKDN (Tingkat Komponen Dalam Negeri)",
    description:
      "Bukti komitmen kami dalam mendukung kemandirian industri nasional melalui penyediaan produk dengan kandungan lokal yang tinggi, menjadikannya solusi legal dan kompetitif untuk berbagai proyek strategis dan industri tanah air.",
    logo: "/logo-tkdn.png",
    logoAlt: "Logo TKDN",
  },
];

export function CertificateSection() {
  return (
    <section
      className="w-full py-12 md:py-14 lg:py-16"
      style={{ backgroundColor: "#f5f9f0" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title — left aligned + green divider line */}
        <div className="mb-8 md:mb-10">
          <h2
            className="font-[family-name:var(--font-montserrat)] font-bold tracking-tight"
            style={{ fontSize: "36px", color: "#1f422e" }}
          >
            Sertifikasi Kami
          </h2>
          {/* Green divider line — same style as WhyChooseUs */}
          <div
            className="mt-4"
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "#7aa259",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Certificate entries — stacked vertically */}
        <div className="flex flex-col gap-8 md:gap-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start gap-5 md:gap-6"
            >
              {/* Logo / Badge — no background, just the PNG */}
              <div className="flex-shrink-0">
                <Image
                  src={cert.logo}
                  alt={cert.logoAlt}
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col">
                <h3
                  className="font-[family-name:var(--font-montserrat)] font-semibold leading-snug mb-2"
                  style={{ fontSize: "24px", color: "#1f422e" }}
                >
                  {cert.title}
                </h3>
                <p
                  className="leading-relaxed font-[family-name:var(--font-jakarta)]"
                  style={{ fontSize: "16px", color: "#555555" }}
                >
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
