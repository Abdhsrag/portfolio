/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 3s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
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
            transform: "translateY(-20px)",
          },
        },
      },
    },
  },
  plugins: [],
};