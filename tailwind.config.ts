import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      mobile: { max: "560px" },
      tablet: { min: "561px", max: "800px" },
      desktop: "801px",
    },
    extend: {
      colors: {
        paper: "#f5f5f7",
        ink: "#1d1d1f",
        muted: "#6e6e73",
        blue: "#0077ed",
        "blue-hover": "#0066cc",
        line: "#e5e5ea",
      },
      fontFamily: {
        sans: ["SF Pro Display", "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(29, 29, 31, .055)",
      },
    },
  },
  plugins: [],
};

export default config;
