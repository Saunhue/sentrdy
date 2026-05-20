"use client";

import dynamic from "next/dynamic";

// Kita pindahkan dynamic import dengan ssr: false ke dalam Client Component ini
const SiteHeader = dynamic(
  () => import("./site-header").then((mod) => mod.SiteHeader),
  { ssr: false }
);

export function HeaderWrapper() {
  return <SiteHeader />;
}