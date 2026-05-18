"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data — 9 sample articles (NO PHOTOS)                               */
/* ------------------------------------------------------------------ */

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  month: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "PJU Tenaga Surya: Solusi Penerangan Jalan Hemat Energi untuk Kota Modern",
    excerpt:
      "太陽光を利用したストリートライトは、エネルギー効率の向上と環境負荷の軽減を同時に実現する革新的なソリューションです。最新のLED技術と高性能太陽電池モジュールを組み合わせることで、夜間でも安定した明るさを確保しながら、従来の照明に比べて電力消費を最大70%削減できます。また、智能制御システムにより...",
    date: "12",
    month: "Mei",
  },
  {
    id: 2,
    title: "Cara Memilih Solar Cell Terbaik untuk Kebutuhan Rumah dan Industri",
    excerpt:
      "太陽電池パネルの選定は、設置環境と電力需要を正確に把握することが重要です。変換効率、耐久性、価格のバランスを考慮し、最適な製品を選定するためのポイントを詳しく解説します。単結晶シリコンパネルは高効率ですが価格が高く、多結晶シリコンパネルはコストパフォーマンスに優れています。薄膜太陽電池は柔軟性があり...",
    date: "10",
    month: "Mei",
  },
  {
    id: 3,
    title: "Pentingnya Penangkal Petir pada Bangunan Modern dan Infrastruktur",
    excerpt:
      "現代の建築物やインフラストラクチャーにおいて、避雷設備の設置は極めて重要な安全対策です。最新の規制と技術基準に基づいた保護システムを導入することで、落雷による人命の被害や設備の損傷を未然に防ぐことができます。フランク・ウィルソン方式の保護角法や回転球体法など、建物の構造と立地に応じた最適な保護方法を...",
    date: "08",
    month: "Mei",
  },
  {
    id: 4,
    title: "Baterai UPS: Menjaga Operasional Bisnis Tanpa Gangguan Listrik",
    excerpt:
      "無停電電源装置（UPS）は、ビジネスの継続性を確保するために不可欠な設備です。適切な容量の選定と定期的なメンテナンスの重要性について詳しく解説します。オンライン方式、ラインインタラクティブ方式、スタンバイ方式など、各UPS方式の特徴と適用用途を理解し、負荷機器の重要度と電力消費量に基づいて...",
    date: "05",
    month: "Mei",
  },
  {
    id: 5,
    title: "Tren Energi Terbarukan di Indonesia: Peluang dan Tantangan",
    excerpt:
      "インドネシアにおける再生可能エネルギーの最新動向について包括的なレポートをお届けします。太陽光、風力、水力など各分野の急速な成長と政府の強力な政策支援により、再エネ市場は飛躍的な拡大を見せています。PLNのグリーンエネルギープログラムや独立系発電事業者へのインセンティブ制度など、政策的な後押しも...",
    date: "03",
    month: "Mei",
  },
  {
    id: 6,
    title: "Tips Merawat PJU Tenaga Surya Agar Awet dan Performa Optimal",
    excerpt:
      "太陽光発電ストリートライトのメンテナンス方法について、実用的なアドバイスを提供します。定期的な点検と適切な清掃手順で長寿命化と性能維持を実現する方法を解説します。太陽電池パネルの表面の汚れやほこりは発電効率を大幅に低下させるため、月に一度の清掃が推奨されます。また、バッテリーの端子の...",
    date: "01",
    month: "Mei",
  },
  {
    id: 7,
    title: "Instalasi Panel Surya: Panduan Lengkap untuk Pemula",
    excerpt:
      "ソーラーパネルの設置に関する包括的なガイドを提供します。設置場所の選定から、配線方法、安全対策、許認可手続きまで、初心者にも分かりやすく解説します。屋根の向きと傾斜角度は発電効率に直結するため、最適な方位角と傾斜角の計算方法を理解することが重要です。また、架台の設置、パネルの固定、配線の接続...",
    date: "28",
    month: "Apr",
  },
  {
    id: 8,
    title: "Mengapa Sertifikasi SNI Penting untuk Produk Elektronik dan Kelistrikan?",
    excerpt:
      "インドネシア国家規格（SNI）認証の重要性について解説します。製品の安全性と品質保証の観点から、認証取得のメリットとプロセスを詳しく説明します。SNI認証は消費者の安全を保護するための強力な品質保証制度であり、電気製品や建築材料など多くの製品カテゴリーで義務化されています。認証取得には製品テスト、工場監査...",
    date: "25",
    month: "Apr",
  },
  {
    id: 9,
    title: "Studi Kasus: Penghematan Energi 60% dengan Solar Panel Komersial",
    excerpt:
      "太陽光パネル導入によるエネルギーコスト削減の成功事例を紹介します。実際のデータに基づき、投資回収期間と省エネ効果を定量的に分析します。スラバヤの商業施設に200kWの屋上ソーラーシステムを導入した結果、月間電気代が約60%削減されました。初期投資額は約30億ルピアですが、削減された電気代と余剰電力の売電...",
    date: "22",
    month: "Apr",
  },
];

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const C = {
  bg: "#eceed6",
  titleColor: "#1f422e",
  textColor: "#555555",
  dateBoxBg: "#fac669",
  dateTextColor: "#1f422e",
  dividerColor: "#7aa259",
  arrowColor: "#fac669",
  dotActive: "#7aa259",
  dotInactive: "rgba(122, 162, 89, 0.3)",
};

/* ------------------------------------------------------------------ */
/*  ArticleHighlightSection                                            */
/* ------------------------------------------------------------------ */

export function ArticleHighlightSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Responsive: desktop 3, tablet 2, mobile 1 per slide
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(ARTICLES.length / slidesPerView);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const currentArticles = ARTICLES.slice(
    currentPage * slidesPerView,
    currentPage * slidesPerView + slidesPerView
  );

  return (
    <section
      className="relative w-full py-8 md:py-10 lg:py-12"
      style={{ backgroundColor: C.bg }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Slider Controls — right-aligned */}
        <div className="flex justify-end items-center gap-2 mb-4 md:mb-6">
          <button
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{ border: "none", backgroundColor: "transparent" }}
            aria-label="Previous"
          >
            <ChevronLeft
              width={18}
              height={18}
              strokeWidth={2.4}
              style={{ color: C.arrowColor }}
            />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{ border: "none", backgroundColor: "transparent" }}
            aria-label="Next"
          >
            <ChevronRight
              width={18}
              height={18}
              strokeWidth={2.4}
              style={{ color: C.arrowColor }}
            />
          </button>
        </div>

        {/* Articles Grid — responsive columns */}
        <div
          className="grid gap-4 md:gap-6"
          style={{
            gridTemplateColumns: `repeat(${slidesPerView}, minmax(0, 1fr))`,
          }}
        >
          {currentArticles.map((article) => (
            <article
              key={article.id}
              className="cursor-pointer group"
              onClick={() => {
                /* TODO: navigate to article detail page — WAIT for user instruction */
              }}
            >
              {/* Layout: LEFT (date stack) | RIGHT (title + paragraph) */}
              <div className="flex gap-3">
                {/* LEFT STACK: date box → month → divider */}
                <div className="flex flex-col shrink-0" style={{ width: "52px" }}>
                  {/* Date box — #fac669 */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundColor: C.dateBoxBg,
                      borderRadius: "6px",
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-montserrat)] font-bold"
                      style={{ fontSize: "20px", color: C.dateTextColor }}
                    >
                      {article.date}
                    </span>
                  </div>

                  {/* Month text (no box) — centered */}
                  <span
                    className="font-[family-name:var(--font-jakarta)] font-medium mt-1 text-center"
                    style={{ fontSize: "14px", color: C.titleColor }}
                  >
                    {article.month}
                  </span>

                  {/* Divider line */}
                  <div
                    className="mt-2"
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: C.dividerColor,
                    }}
                  />
                </div>

                {/* RIGHT: title + paragraph */}
                <div className="flex flex-col min-w-0 flex-1">
                  {/* Title */}
                  <h3
                    className="font-[family-name:var(--font-montserrat)] font-semibold leading-snug mb-1.5"
                    style={{ fontSize: "15px", color: C.titleColor }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt — max 3 lines with ellipsis */}
                  <p
                    className="font-[family-name:var(--font-jakarta)] leading-relaxed"
                    style={{
                      fontSize: "13px",
                      color: C.textColor,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots indicator — hidden on mobile when 1-per-slide */}
        {slidesPerView > 1 && (
          <div className="flex justify-center items-center gap-2 mt-5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className="transition-all duration-200 cursor-pointer"
                style={{
                  width: currentPage === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor:
                    currentPage === i ? C.dotActive : C.dotInactive,
                  border: "none",
                  padding: 0,
                }}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
