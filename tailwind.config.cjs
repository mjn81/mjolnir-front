/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#022DDA',
        hoverprimary: '#1332FD',
        cblack: '#070716',
        cwhite: '#FAFAFA',
        border: {
          primary: '#0126B6',
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
