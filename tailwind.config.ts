import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        heading: [
          "Manrope",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#111827",
        cloud: "#f7f8fb",
        accent: "#0f766e",
        ember: "#f97316",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(17, 24, 39, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
