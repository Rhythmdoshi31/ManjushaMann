/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Host Grotesk"', 'sans-serif'],
        mincho: ['"Shippori Mincho"', 'serif'],
      },
    },
  },
  plugins: [],
}

