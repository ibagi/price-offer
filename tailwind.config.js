/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        customTheme: {
          'color-scheme': 'light',
          primary: '#0d9488',
          secondary: 'oklch(69.71% 0.329 342.55)',
          'secondary-content': 'oklch(98.71% 0.0106 342.55)',
          accent: 'oklch(76.76% 0.184 183.61)',
          neutral: '#2B3440',
          'neutral-content': '#D7DDE4',
          'base-100': 'oklch(100% 0 0)',
          'base-200': '#F2F2F2',
          'base-300': '#E5E6E6',
          'base-content': '#1f2937',
        },
      },
      'dark',
      'cupcake',
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
