/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            laptop: {
                raw: '(min-width: 1366px)',
            },
            laptop1080: {
                raw: '(min-width: 1366px)',
            },
            '2xl': '1536px',
        },
        extend: {
            colors: {
                'blue-floral': 'rgb(21, 38, 56)',
                gold: 'rgb(230, 195, 144)',
                gold2: 'rgb(238, 187, 111)',
            },

            fontFamily: {
                lovely: ['lovely'],
                ayuku: ['ayuku'],
                lmroman: ['Lmroman'],
                HinaMincho: ['Hina Mincho', 'serif'],
                NotoSerif: ['Noto Serif', 'serif'],
                Peddana: ['Peddana', 'serif'],
                Uchen: ['Uchen', 'serif'],
                BebasNeue: ['Bebas Neue'],
                Creattion: ['Creattion'],
                AlexBrush: ['AlexBrush'],
                FleurDeLeah: ['Fleur De Leah'],
                Inter: ['Inter', 'sans-serif'],
            },

            keyframes: {
                'bounce-right': {
                    '0%': {
                        transform: 'translateX(10%)',
                        'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
                    },
                    '50%': {
                        transform: 'translateX(-10%)',
                        'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
                    },
                    '100%': {
                        transform: 'translateX(10%)',
                        'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
                    },
                },
            },

            animation: {
                drop: 'drop 5000ms linear infinite',
                ripple: 'ripple 5000ms ease-out infinite',
                rotation: 'rotation linear infinite',
                'bounce-right': 'bounce-right 1s infinite',
            },
        },
    },
    plugins: [],
}
