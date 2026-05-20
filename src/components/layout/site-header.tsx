'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  FolderOpen,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const WA_NUMBER = '6282230261340';
const WA_LINK = `https://wa.me/${WA_NUMBER}`;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tenagasuryaku/',
    Icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/dayaberkah.sentosa/',
    Icon: Facebook,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC6yCmjqqoLYaOKtkvia0EOA',
    Icon: Youtube,
  },
];

const PRODUCT_SUBCATEGORIES = [
  { label: 'PJU', href: '#pju' },
  { label: 'Solar Cell', href: '#solar-cell' },
  { label: 'Penangkal Petir', href: '#penangkal-petir' },
  { label: 'Baterai', href: '#battery' },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/product', hasDropdown: true },
  { label: 'Projects', href: '/projects' },
  { label: 'RFQ', href: '/rfq' },
  { label: 'About Us', href: '/about' },
];

/* ------------------------------------------------------------------ */
/*  Sub‑Header (top info bar)                                          */
/* ------------------------------------------------------------------ */

function SubHeader({ scrolled }: { scrolled: boolean }) {
  return (
    <div
      className="hidden md:block w-full transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? '#173422'
          : 'rgba(23, 52, 34, 0.35)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
        {/* Left: location, hours, phone (desktop only) */}
        <div className="flex items-center gap-5 text-xs" style={{ color: '#f1f3f4' }}>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="opacity-90">Sidoarjo, Indonesia</span>
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3 h-3 shrink-0" />
            <span className="opacity-90">Senin – Jumat: 08.00 – 17.00 WIB</span>
          </span>
          {/* Phone only on desktop (lg+) */}
          <span className="hidden lg:flex items-center gap-1.5 whitespace-nowrap">
            <Phone className="w-3 h-3 shrink-0" />
            <span className="opacity-90">+62 822-3026-1340</span>
          </span>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-opacity duration-200 hover:opacity-80"
              style={{ color: '#f1f3f4' }}
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop Product Dropdown                                           */
/* ------------------------------------------------------------------ */

function ProductDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
        open
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible -translate-y-2'
      }`}
    >
      <div
        className="w-60 rounded-lg shadow-xl border overflow-hidden"
        style={{
          backgroundColor: '#1f422e',
          borderColor: 'rgba(122, 162, 89, 0.3)',
        }}
      >
        {PRODUCT_SUBCATEGORIES.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="block px-4 py-3 text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors duration-150"
            style={{ color: '#f1f3f4' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#7aa259';
              (e.currentTarget as HTMLElement).style.backgroundColor = '#294b38';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#f1f3f4';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav link with underline animation                                  */
/* ------------------------------------------------------------------ */

function NavLink({
  href,
  children,
  hasDropdown,
  dropdownOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  href: string;
  children: React.ReactNode;
  hasDropdown?: boolean;
  dropdownOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group relative px-3 py-2 text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors duration-200"
      style={{ color: '#f1f3f4' }}
      onMouseEnter={() => {
        setHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setHovered(false);
        onMouseLeave?.();
      }}
    >
      <span
        className={`transition-colors duration-200 ${
          hovered ? 'text-[#7aa259]' : ''
        }`}
      >
        {children}
      </span>
      {/* Underline animation */}
      <span
        className="absolute bottom-0 left-1/2 h-[2px] rounded-full transition-all duration-300 ease-out"
        style={{
          backgroundColor: '#7aa259',
          width: hovered ? '60%' : '0%',
          marginLeft: hovered ? '-30%' : '0%',
        }}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Draft RFQ Folder Button (with tooltip — 0.5s delay)                */
/* ------------------------------------------------------------------ */

function DraftRfqButton() {
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    setHovered(true);
    timerRef.current = setTimeout(() => setShowTooltip(true), 500);
  };

  const handleLeave = () => {
    setHovered(false);
    setShowTooltip(false);
    clearTimeout(timerRef.current);
  };

  return (
    <div className="relative flex items-center">
      <Link
        href="#"
        className="flex items-center px-2 py-2 transition-colors duration-200"
        style={{ color: hovered ? '#7aa259' : '#f1f3f4' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={(e) => {
          e.preventDefault();
          /* TODO: navigate to draft RFQ page — wait for user instruction */
        }}
        aria-label="Draft RFQ"
      >
        {/* Folder icon — mixed solid + stroke via two overlapping icons */}
        <div className="relative" style={{ width: '20px', height: '20px' }}>
          {/* Stroke-only layer (back) */}
          <FolderOpen
            width={20}
            height={20}
            strokeWidth={2}
            fill="none"
            className="absolute inset-0"
            style={{ color: 'inherit' }}
          />
          {/* Solid fill layer (front) — only the front panel filled */}
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute inset-0"
            style={{ opacity: 0.35 }}
          >
            <path d="M4 4h5l2 2h9a2 2 0 0 1 2 2v1H4V4z" />
          </svg>
        </div>
      </Link>

      {/* Tooltip popup — appears after 0.5s hover */}
      {showTooltip && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-md text-xs font-medium font-[family-name:var(--font-jakarta)] whitespace-nowrap shadow-lg z-50 pointer-events-none"
          style={{
            backgroundColor: '#1f422e',
            color: '#eceed6',
            border: '1px solid rgba(122, 162, 89, 0.3)',
          }}
        >
          Draft RFQ
          {/* Tooltip arrow */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
            style={{
              backgroundColor: '#1f422e',
              borderLeft: '1px solid rgba(122, 162, 89, 0.3)',
              borderTop: '1px solid rgba(122, 162, 89, 0.3)',
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop Navigation                                                 */
/* ------------------------------------------------------------------ */

function DesktopNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const openDropdown = useCallback(() => setDropdownOpen(true), []);

  const handleProductEnter = () => {
    clearTimeout(dropdownTimeout.current);
    openDropdown();
  };
  const handleProductLeave = () => {
    dropdownTimeout.current = setTimeout(closeDropdown, 150);
  };

  return (
    <nav className="hidden lg:flex items-center h-full gap-1">
      {NAV_LINKS.map((link) =>
        link.hasDropdown ? (
          <div
            key={link.label}
            className="relative h-full flex items-center"
            onMouseEnter={handleProductEnter}
            onMouseLeave={handleProductLeave}
          >
            <Link
              href={link.href}
              className="group relative flex items-center gap-1 px-3 py-2 text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors duration-200"
              style={{ color: '#f1f3f4' }}
            >
              <span className="group-hover:text-[#7aa259] transition-colors duration-200">
                {link.label}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-[#f1f3f4] group-hover:text-[#7aa259] ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
              {/* Underline animation */}
              <span
                className="absolute bottom-0 left-1/2 h-[2px] rounded-full transition-all duration-300 ease-out"
                style={{
                  backgroundColor: '#7aa259',
                  width: dropdownOpen ? '70%' : '0%',
                  marginLeft: dropdownOpen ? '-35%' : '0%',
                }}
              />
            </Link>
            <ProductDropdown open={dropdownOpen} onClose={closeDropdown} />
          </div>
        ) : (
          <NavLink key={link.label} href={link.href}>
            {link.label}
          </NavLink>
        )
      )}

      {/* Draft RFQ Folder */}
      <DraftRfqButton />

      {/* CTA WhatsApp */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-3 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold font-[family-name:var(--font-jakarta)] transition-all duration-200 hover:brightness-110 hover:shadow-lg"
        style={{ backgroundColor: '#c4f90c', color: '#173422' }}
      >
        <MessageCircle className="w-4 h-4" />
        Contact Us
      </a>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Navigation                                                  */
/* ------------------------------------------------------------------ */

function MobileNav() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = () => {
      if (mql.matches && open) setOpen(false);
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [open]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 rounded-md transition-colors hover:bg-white/10"
        style={{ color: '#f1f3f4' }}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] shadow-2xl transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: '#1f422e' }}
        >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between px-5 h-16 border-b"
            style={{ borderColor: 'rgba(241, 243, 244, 0.1)' }}
          >
            <span className="text-base font-bold font-[family-name:var(--font-jakarta)]" style={{ color: '#f1f3f4' }}>
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-md transition-colors hover:bg-white/10"
              style={{ color: '#f1f3f4' }}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer nav links */}
          <nav className="px-3 py-4 flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => setProductOpen(!productOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors duration-150"
                    style={{ color: '#f1f3f4' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#7aa259';
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#294b38';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '#f1f3f4';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        productOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      productOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 flex flex-col gap-0.5 pb-2">
                      {PRODUCT_SUBCATEGORIES.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="block px-4 py-2.5 rounded-lg text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors duration-150"
                          style={{ color: '#f1f3f4' }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = '#7aa259';
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#294b38';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = '#f1f3f4';
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium font-[family-name:var(--font-jakarta)] transition-colors duration-150"
                  style={{ color: '#f1f3f4' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#7aa259';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#294b38';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#f1f3f4';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* CTA WhatsApp */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold font-[family-name:var(--font-jakarta)] transition-all hover:brightness-110"
              style={{ backgroundColor: '#c4f90c', color: '#173422' }}
            >
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </a>

            {/* Social links */}
            <div
              className="mt-4 pt-4 flex items-center justify-center gap-5 border-t"
              style={{ borderColor: 'rgba(241, 243, 244, 0.1)' }}
            >
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: '#f1f3f4' }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <img
        src="/logo-company.webp"
        alt="Sentradaya Logo"
        className="w-[45px] h-[45px] object-contain"
      />
      <div className="flex flex-col leading-none">
        <span
          className="text-lg font-bold tracking-tight font-[family-name:var(--font-montserrat)]"
          style={{ color: '#f1f3f4' }}
        >
          Sentradaya
        </span>
        <span
          className="text-[10px] tracking-widest uppercase opacity-70 font-[family-name:var(--font-inter-mono)]"
          style={{ color: '#f1f3f4' }}
        >
          Energy Solutions
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Site Header                                                   */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [subHeaderHidden, setSubHeaderHidden] = useState(false);
  const pathname = usePathname();

  // Inner pages: RFQ & About — increase transparency by 22%
  const isInnerPage = pathname === '/rfq' || pathname === '/about';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setSubHeaderHidden(y > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute background colors based on page type
  // Inner pages: opacity * 0.78 (22% more transparent)
  const subBgScrolled = isInnerPage
    ? 'rgba(23, 52, 34, 0.78)'
    : '#173422';
  const subBgDefault = isInnerPage
    ? 'rgba(23, 52, 34, 0.27)'
    : 'rgba(23, 52, 34, 0.35)';
  const headerBgScrolled = isInnerPage
    ? 'rgba(31, 66, 46, 0.78)'
    : '#1f422e';
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Sub‑header — slides up and disappears on scroll */}
      <div
        className="w-full overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: subHeaderHidden ? '0px' : '36px',
          opacity: subHeaderHidden ? 0 : 1,
          backgroundColor: scrolled
            ? subBgScrolled
            : subBgDefault,
        }}
      >
        <SubHeader scrolled={scrolled} />
      </div>

      {/* Main header / nav bar — stays fixed */}
      <div
        className="w-full transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? headerBgSrolled
            : 'rgba(31, 66, 46, 0)',
          boxShadow: scrolled
            ? '0 2px 16px rgba(0,0,0,0.15)'
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Logo />
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
