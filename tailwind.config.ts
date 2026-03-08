import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#d4a373", // Example coffee-ish primary color
                "primary-dark": "#b18456",
                dark: "#121212",
                "dark-card": "#1c1c1c",
            },
            fontFamily: {
                sans: ["var(--font-outfit)"],
            },
        },
    },
    plugins: [],
};
export default config;
