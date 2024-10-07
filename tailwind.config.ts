import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        color1: "#272829",
        color2: "#61677A",
        color3: "#D8D9DA",
        color4: "#FFF6E0",
      },
    },
  },
  plugins: [],
};
export default config;
