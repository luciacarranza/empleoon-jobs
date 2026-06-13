import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Empleoon — sage green branding
        brand: {
          50:  "#f4f7f4",  // casi blanco verdoso
          100: "#e8f0e6",  // verde muy claro (off-white del kit)
          200: "#ccdfc8",  // sage claro (color 3 del kit)
          300: "#a8c4a2",  // sage medio claro (color 2 del kit)
          400: "#7ea87a",  // sage medio
          500: "#5c7a5a",  // sage principal (color 1 del kit)
          600: "#4a6748",  // verde oscuro (color 4 del kit)
          700: "#3d5c3b",  // forest verde (color 5 del kit)
          800: "#2e4530",
          900: "#1e2e20",
        },
        accent: {
          50:  "#f5f7f2",
          100: "#e8f0e4",
          200: "#ccdfc5",
          300: "#a8c4a0",
          400: "#7ea875",
          500: "#5c7a52",  // variante accent más cálida
          600: "#4a6740",
        },
        cream: "#f7f8f5",  // off-white del kit (color 6)
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // Gradiente sutil sage — de claro a oscuro
        "gradient-brand":
          "linear-gradient(135deg, #7ea87a 0%, #3d5c3b 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #f4f7f4 0%, #e8f0e6 50%, #ccdfc8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
