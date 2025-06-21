import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Shoegaze-themed color palette - Updated to mint green base
        background: {
          DEFAULT: '#0a0a0f', // Deep dark
          secondary: '#131318', // Slightly lighter dark
          tertiary: '#1a1a24', // Card backgrounds
        },
        foreground: {
          DEFAULT: '#f8f8ff', // Warm white
          secondary: '#d1d1db', // Muted text
          tertiary: '#9999a8', // Subtle text
        },
        // Dreamy accent colors - Updated to mint/green theme
        dream: {
          mint: '#a8e6cf', // Soft mint green
          seafoam: '#b8f2d4', // Pale seafoam
          aqua: '#a8e6e1', // Soft aqua
          sage: '#c4e8d4', // Light sage green
        },
        // Atmospheric colors - Updated to green/teal theme
        atmosphere: {
          forest: '#2d5a3f', // Deep forest green
          sage: '#3a5f4a', // Deep sage
          slate: '#2d2d36', // Slate gray (kept for contrast)
          mist: '#48485a', // Misty gray (kept for contrast)
        },
        // Interactive elements - Updated to mint green theme
        primary: {
          DEFAULT: '#a8e6cf', // Soft mint green
          hover: '#b8f2d4', // Lighter on hover
          active: '#98d6bf', // Darker when active
        },
        secondary: {
          DEFAULT: '#a8e6e1', // Soft aqua
          hover: '#b8f2e4', // Lighter on hover
          active: '#98d6d1', // Darker when active
        },
        // UI states
        border: '#2d2d36',
        input: '#1a1a24',
        ring: '#a8e6cf',
        muted: {
          DEFAULT: '#131318',
          foreground: '#9999a8',
        },
        destructive: {
          DEFAULT: '#e85d75', // Soft red
          foreground: '#f8f8ff',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dreamy-gradient': 'linear-gradient(135deg, #2d5a3f 0%, #3a5f4a 50%, #2d2d36 100%)',
        'atmosphere-gradient': 'linear-gradient(180deg, #0a0a0f 0%, #131318 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'dreamy': '0 8px 32px 0 rgba(168, 230, 207, 0.1)',
        'atmospheric': '0 4px 24px 0 rgba(45, 90, 63, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;