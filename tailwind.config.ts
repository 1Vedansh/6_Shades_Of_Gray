import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8f6",
          100: "#E7F2EF",
          200: "#d1e5df",
          300: "#A1C2BD",
          400: "#A1C2BD",
          500: "#8bb4ae",
          600: "#6fa198",
          700: "#708993",
          800: "#4a6b72",
          900: "#19183B",
          950: "#0f0e24"
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        }
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(25, 24, 59, 0.25)',
      }
    }
  },
  plugins: []
};

export default config;