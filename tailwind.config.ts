import  Flowbite  from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    Flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'cuslor-1': '#274C77', // dodge blue
        'cuslor-2': '#8B8C89', // gray
        'cuslor-3': '#E7ECEF', //white bone
        'cuslor-4': '#FFB923', //Orange
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
