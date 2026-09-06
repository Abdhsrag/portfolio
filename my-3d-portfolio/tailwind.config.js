/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          bg: "#0d0e12",
          surface: "#171821",
          surfaceLight: "#20222e",
          border: "#000000",
          yellow: "#FFE600",
          cyan: "#00F0FF",
          pink: "#FF4088",
          lime: "#22C55E",
          purple: "#A855F7",
          orange: "#FF6B35",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        "brutal-sm": "2px 2px 0px #000",
        "brutal": "4px 4px 0px #000",
        "brutal-lg": "6px 6px 0px #000",
        "brutal-xl": "8px 8px 0px #000",
        "brutal-yellow": "4px 4px 0px #FFE600",
        "brutal-yellow-lg": "6px 6px 0px #FFE600",
        "brutal-cyan": "4px 4px 0px #00F0FF",
        "brutal-cyan-lg": "6px 6px 0px #00F0FF",
        "brutal-pink": "4px 4px 0px #FF4088",
        "brutal-lime": "4px 4px 0px #22C55E",
        "brutal-white": "4px 4px 0px #FFFFFF",
      },
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 3s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gradient-x": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
          },
          "50%": { 
            backgroundPosition: "100% 50%",
          },
        },
        "gradient-y": {
          "0%, 100%": { 
            backgroundPosition: "50% 0%",
          },
          "50%": { 
            backgroundPosition: "50% 100%",
          },
        },
        float: {
          "0%, 100%": { 
            transform: "translateY(0)",
          },
          "50%": { 
            transform: "translateY(-12px)",
          },
        },
      },
    },
  },
  plugins: [],
};