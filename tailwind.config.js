/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "blue-floral": "rgb(21, 38, 56)",
                "gold": "rgb(230, 195, 144)",
            },

            fontFamily: {
                'lovely': ['lovely'],
                'ayuku': ['ayuku'],
                'LoveConchetta': ['"Love Conchetta"'],
                'lmroman': ['Lmroman'],
                'HinaMincho': ['Hina Mincho', 'serif'],
                'NotoSerif': ['Noto Serif', 'serif'],
                'Peddana': ['Peddana', 'serif'],
                'Uchen': ['Uchen', 'serif'],
                'BebasNeue': ['Bebas Neue'],
                'Creattion': ['Creattion'],
                'FleurDeLeah': ['Fleur De Leah'],
                'Inter': ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
