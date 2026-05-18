import { HeroSection } from '@/components/layout/hero-section';
import { WhyChooseUs } from '@/components/layout/why-choose-us';
import { CertificateSection } from '@/components/layout/certificate-section';
import { OurProcessSection } from '@/components/layout/our-process-section';
import { TrustBadgeSection } from '@/components/layout/trust-badge-section';
import { PortfolioSection } from '@/components/layout/portfolio-section';
import { ArticleHighlightSection } from '@/components/layout/article-highlight-section';
import { RfqFormSection } from '@/components/layout/rfq-form-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section — photo interactive with cycling text */}
      <HeroSection />

      {/* Why Choose Us — Kenapa Harus Kami */}
      <WhyChooseUs />

      {/* Certificate — Sertifikasi Kami */}
      <CertificateSection />

      {/* Our Process — Proses Kami */}
      <OurProcessSection />

      {/* Trust Badge — Mitra Kami */}
      <TrustBadgeSection />

      {/* Portfolio — Recent Work */}
      <PortfolioSection />

      {/* Article Highlight */}
      <ArticleHighlightSection />

      {/* RFQ Form — Request for Quotation */}
      <RfqFormSection />
    </div>
  );
}
