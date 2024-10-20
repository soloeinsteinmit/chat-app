import { nextui } from "@nextui-org/react";
import { flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette.js";

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  const colors = theme("colors");
  let newVars = {};

  Object.keys(colors).forEach((colorKey) => {
    const value = colors[colorKey];
    if (typeof value === "string") {
      newVars[`--${colorKey}`] = value;
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([shade, shadeValue]) => {
        newVars[`--${colorKey}-${shade}`] = shadeValue;
      });
    }
  });

  addBase({
    ":root": newVars,
  });
}
