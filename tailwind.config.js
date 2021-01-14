const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js', './pages/**/*.mdx', './jobs/**/*.md'],
  theme: {
    extend: {
      colors: {
        teal: colors.cyan,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
}
