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
        // Shoegaze-themed color palette
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
        // Dreamy accent colors
        dream: {
          pink: '#e8b4d4', // Soft pink
          blue: '#b4d4e8', // Pale blue
          purple: '#c4b4e8', // Soft purple
          lavender: '#d4c4e8', // Light lavender
        },
        // Atmospheric colors
        atmosphere: {
          indigo: '#3b2f5f', // Deep indigo
          purple: '#4a3268', // Deep purple
          slate: '#2d2d36', // Slate gray
          mist: '#48485a', // Misty gray
        },
        // Interactive elements
        primary: {
          DEFAULT: '#c4b4e8', // Soft purple
          hover: '#d4c4e8', // Lighter on hover
          active: '#b4a4d8', // Darker when active
        },
        secondary: {
          DEFAULT: '#e8b4d4', // Soft pink
          hover: '#f8c4e4', // Lighter on hover
          active: '#d8a4c4', // Darker when active
        },
        // UI states
        border: '#2d2d36',
        input: '#1a1a24',
        ring: '#c4b4e8',
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
        'dreamy-gradient': 'linear-gradient(135deg, #3b2f5f 0%, #4a3268 50%, #2d2d36 100%)',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'dreamy': '0 8px 32px 0 rgba(196, 180, 232, 0.1)',
        'atmospheric': '0 4px 24px 0 rgba(59, 47, 95, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;