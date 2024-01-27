import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      cornflowerBlue: "#7090E8",
      davysGray: "#4E5358",
      vistaBlue: "#93ABED",
      ghostWhite: "#F1F4FD",
      seaSalt: "#F7F7F7",
      white: "#ffffff",
      antiFlashWhite: "#F0F0F0",
    },
  },
  plugins: [],
};
export default config;
