/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js,jsx,ts,tsx}'];
export const theme = {
    extend: {
        colors: {
            primary: '#212121',
            primaryDark: '#6a6a67',
            secondary: '#FAF8F4',
            tertiary: '#F3F3EB',
            light: '#E7E7E7',
            brown: '#4F4631',
            green: '#314F4A',
            lightGreen: '#4bdb6c',
            blue: '#31344F',
            red: '#BF2025',
            hoverPrimary: '#2C2C2C',
            focusPrimary: '#424242',
            disabledText: '#21212133',
            disabledBackground: '#F2F2F2',
            thirsty: '#E7E7E7',
        },
        backgroundImage: {
            'bg-image-main': "url('/main-1.webp')",
            'bg-image-main2': "url('/offerS1.webp')",
            'bg-image-main3': "url('/offerS2.webp')",
            'bg-image-main4': "url('/catalog-3.webp')",
        },
    },
};
export const darkMode = 'class';
