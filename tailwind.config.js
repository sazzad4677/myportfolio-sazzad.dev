module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        navy: "#0a192f",
        libertyBlue: "#0A192F",
        lightNavy: "#112240",
        lightestNavy: "#233554",
        navyShadow: "rgba(2, 12, 27, 0.7)",
        slate: "#8892b0",
        darkSlate: "#495670",
        lightSlate: "#a8b2d1",
        lightestSlate: "#ccd6f6",
        blueWhite: "#e6f1ff",
        green: "#64ffda",
        greenTint: "rgba(100, 255, 218, 0.1)",
        boatswain: "#233554",
        white: "#e6f1ff",
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
