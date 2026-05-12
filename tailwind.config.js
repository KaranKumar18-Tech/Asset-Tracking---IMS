/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emb: {
          deep:          '#0c2114',
          dark:          '#063520',
          mid:           '#20452e',
          med:           '#346948',
          green:         '#47bf72',
          light:         '#e1f3e9',
          purple:        '#533E85',
          warm:          '#FFE8C2',
          gray:          '#eeeeee',
          surface:       '#f7faf8',
          card:          '#ffffff',
          border:        '#d4e8db',
          textprimary:   '#0f1e16',
          textsecondary: '#3d6b4f',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      }
    }
  },
  plugins: []
}
