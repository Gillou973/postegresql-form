/** @type {import('tailwindcss').Config} */
import defaultConfig from 'tailwindcss/defaultConfig.js'

export default {
  presets: [defaultConfig],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
