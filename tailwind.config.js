/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Core brand — violet on navy
        primary: {
          DEFAULT: "#8B5CF6",
          hover: "#7C3AED",
          soft: "#A78BFA",
        },
        // Surfaces
        background: "#080B14",
        surface: "#10162A",
        "surface-hover": "#171F38",
        raised: "#161C33",
        border: "#232B47",
        "border-soft": "#1B2138",
        // Text
        heading: "#EEF1F8",
        body: "#8891AC",
        muted: "#5D6789",
        // Semantic
        success: "#34D399",
        warning: "#FBBF24",
        danger: "#F87171",
        info: "#60A5FA",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "10px",
        xl: "14px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0, 0, 0, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.32)",
        glow: "0 0 0 1px rgba(139, 92, 246, 0.15), 0 8px 24px -4px rgba(139, 92, 246, 0.25)",
        panel: "0 12px 40px -8px rgba(2, 4, 12, 0.65)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
      },
      spacing: {
        18: "72px",
      },
    },
  },
  plugins: [],
};
