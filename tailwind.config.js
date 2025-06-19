/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out",
        blob: "blob 7s infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-loader": "pulse-loader 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ripple: "ripple 1s ease-out forwards",
        "homepage-entrance": "homepageEntrance 0.8s ease-out",
        "zoom-expand": "zoomExpand 0.5s ease-out forwards",
        "image-reveal": "imageReveal 1s ease-out forwards",
        "fade-to-homepage": "fadeToHomepage 0.7s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "float-delayed": "floatDelayed 3s ease-in-out infinite",
        "float-reverse": "floatReverse 3s ease-in-out infinite",
        orbit: "orbit 4s linear infinite",
        "orbit-reverse": "orbitReverse 5s linear infinite",
        shine: "shine 2s ease-in-out infinite",
        "pulse-custom": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "pulse-loader": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        ripple: {
          "0%": {
            transform: "scale(0)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(20)",
            opacity: "0",
          },
        },
        homepageEntrance: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        zoomExpand: {
          "0%": {
            width: "8px",
            height: "128px",
            transform: "scale(1)",
          },
          "100%": {
            width: "100vw",
            height: "100vh",
            transform: "scale(1)",
          },
        },
        imageReveal: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        fadeToHomepage: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotateX(0deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotateX(5deg)",
          },
        },
        floatDelayed: {
          "0%, 100%": {
            transform: "translateY(0px) rotateY(0deg)",
          },
          "50%": {
            transform: "translateY(-8px) rotateY(10deg)",
          },
        },
        floatReverse: {
          "0%, 100%": {
            transform: "translateY(0px) rotateZ(0deg)",
          },
          "50%": {
            transform: "translateY(6px) rotateZ(-5deg)",
          },
        },
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateX(40px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(40px) rotate(-360deg)",
          },
        },
        orbitReverse: {
          "0%": {
            transform: "rotate(0deg) translateX(-30px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg) translateX(-30px) rotate(360deg)",
          },
        },
        shine: {
          "0%": {
            transform: "translateX(-100%) skewX(-15deg)",
          },
          "100%": {
            transform: "translateX(200%) skewX(-15deg)",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [],
}
