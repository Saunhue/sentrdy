@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-jakarta);
  --font-heading: var(--font-montserrat);
  --font-accent: var(--font-titillium);
  --font-mono: var(--font-inter-mono);

  /* Brand Colors */
  --color-brand-subheader: var(--brand-subheader);
  --color-brand-header: var(--brand-header);
  --color-brand-text: var(--brand-text);
  --color-brand-text-active: var(--brand-text-active);
  --color-brand-cta: var(--brand-cta);

  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  /* Revisi 3: white → #f8f9f1 */
  --background: #f8f9f1;
  --foreground: oklch(0.145 0 0);
  --card: #f8f9f1;
  --card-foreground: oklch(0.145 0 0);
  --popover: #f8f9f1;
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: #f8f9f1;
  --secondary: #f8f9f1;
  --secondary-foreground: oklch(0.205 0 0);
  --muted: #f8f9f1;
  --muted-foreground: oklch(0.556 0 0);
  --accent: #f8f9f1;
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: #f8f9f1;
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: #f8f9f1;
  --sidebar-accent: #f8f9f1;
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  /* Brand Colors */
  --brand-subheader: #173422;
  --brand-header: #1f422e;
  --brand-text: #f1f3f4;
  --brand-text-active: #7aa259;
  --brand-cta: #9fc53e;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Hero animations */
@keyframes heroBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
@keyframes heroScrollWheel {
  0% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(3px); }
  100% { opacity: 0.3; transform: translateY(0); }
}

/* Trust Badge — Infinite Marquee */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.3333%); }
}

.marquee-container {
  overflow: hidden;
  width: 100%;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 78s linear infinite;
}

/* Pause on hover */
.group:hover .marquee-track {
  animation-play-state: paused;
}

/* Trust badge logo styling */
.logo-img {
  height: 43px;
  width: auto;
  object-fit: contain;
}
