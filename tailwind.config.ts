import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/backend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ==================== COLORS ==================== */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "#6366f1",
          dark: "#4f46e5",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "#8b5cf6",
          dark: "#7c3aed",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },

      /* ==================== BORDER RADIUS ==================== */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        "3xl": "calc(var(--radius) * 2.2)",
        "4xl": "calc(var(--radius) * 2.6)",
      },

      /* ==================== FONTS ==================== */
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
      },

      /* ==================== ANIMATIONS ==================== */
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-in-up": "slide-in-up 0.5s ease-out",
        "slide-in-down": "slide-in-down 0.5s ease-out",
        "bounce-soft": "bounce-soft 1s ease-in-out infinite",
        "gradient-animate": "gradient-shift 3s ease infinite",
        "shimmer": "shimmer 2s infinite",
        "border-animate": "border-shift 3s ease infinite",
        "shadow-glow": "shadow-pulse 2s ease-in-out infinite",
      },

      /* ==================== KEYFRAMES ==================== */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-up": {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-in-down": {
          from: {
            transform: "translateY(-20px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "border-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "shadow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(99, 102, 241, 0.6)",
          },
        },
      },

      /* ==================== SPACING ==================== */
      spacing: {
        "sidebar-width": "16rem",
        "header-height": "4rem",
      },

      /* ==================== BOX SHADOW ==================== */
      boxShadow: {
        "glow-sm": "0 0 10px rgba(99, 102, 241, 0.3)",
        "glow-md": "0 0 20px rgba(99, 102, 241, 0.5)",
        "glow-lg": "0 0 40px rgba(99, 102, 241, 0.7)",
        "glow-indigo": "0 0 20px rgba(99, 102, 241, 0.4)",
        "glow-purple": "0 0 20px rgba(147, 51, 234, 0.4)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.4)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "inner-glow": "inset 0 0 20px rgba(99, 102, 241, 0.1)",
      },

      /* ==================== BACKDROP BLUR ==================== */
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
      },

      /* ==================== GRADIENTS ==================== */
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-to-r-primary":
          "linear-gradient(to right, #6366f1, #8b5cf6)",
        "gradient-to-b-primary":
          "linear-gradient(to bottom, #6366f1, #4f46e5)",
        "gradient-mesh":
          "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
      },

      /* ==================== TRANSITIONS ==================== */
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
      },

      /* ==================== Z-INDEX ==================== */
      zIndex: {
        "dropdown": "1000",
        "sticky": "1020",
        "fixed": "1030",
        "modal-backdrop": "1040",
        "modal": "1050",
        "popover": "1060",
        "tooltip": "1070",
      },

      /* ==================== WIDTH & HEIGHT ==================== */
      width: {
        "sidebar": "16rem",
        "content": "calc(100% - 16rem)",
      },

      height: {
        "header": "4rem",
        "content": "calc(100vh - 4rem)",
      },

      /* ==================== SCREEN SIZES ==================== */
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
