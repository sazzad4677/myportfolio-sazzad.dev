module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic theme colors
        primary: "var(--primary)",
        "primary-tint": "var(--primary-tint)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-variant": "var(--surface-variant)",
        "on-background": "var(--on-background)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        shadow: "var(--shadow)",
      },
      transitionTimingFunction: {
        transition: "cubic-bezier(0.645, 0.045, 0.355, 1)",
      },
      fontFamily: {
        mono: "SFMono",
        sans: "Calibre",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
