/**
 * Tailwind CSS v4 — JS config kept minimal for shadcn/ui compatibility.
 * All design tokens are defined in `app/globals.css` via `@theme inline`.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/backend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Theme is fully CSS-driven in v4 — see globals.css @theme block
};

export default config;
