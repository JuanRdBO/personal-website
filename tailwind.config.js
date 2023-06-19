function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        body: withOpacity("--text-base"),
        "body-dark": withOpacity("--text-base-dark"),
        muted: withOpacity("--text-muted"),
        "muted-light": withOpacity("--text-muted-light"),
        heading: withOpacity("--text-heading"),
        "sub-heading": withOpacity("--text-sub-heading"),
        bolder: withOpacity("--text-text-bolder"),
      },

      colors: {
        light: withOpacity("--color-light"),
        dark: withOpacity("--color-dark"),
        accent: withOpacity("--color-accent"),
        "accent-hover": withOpacity("--color-accent-hover"),
        "accent-300": withOpacity("--color-accent-300"),
        "accent-400": withOpacity("--color-accent-400"),
        "accent-500": withOpacity("--color-accent-500"),
        "accent-600": withOpacity("--color-accent-600"),
        "accent-700": withOpacity("--color-accent-700"),
        "border-50": withOpacity("--color-border-50"),
        "border-100": withOpacity("--color-border-100"),
        "border-200": withOpacity("--color-border-200"),
        "border-base": withOpacity("--color-border-base"),
        "border-pending": withOpacity("--color-border-pending"),
        "border-completed": withOpacity("--color-border-completed"), //"rgba(250,121,0), 0.5)",
        "border-400": withOpacity("--color-border-400"),
        "gray-50": withOpacity("--color-gray-50"),
        "gray-100": withOpacity("--color-gray-100"),
        "gray-200": withOpacity("--color-gray-200"),
        "gray-300": withOpacity("--color-gray-300"),
        "gray-400": withOpacity("--color-gray-400"),
        "gray-500": withOpacity("--color-gray-500"),
        "gray-600": withOpacity("--color-gray-600"),
        "gray-700": withOpacity("--color-gray-700"),
        "gray-800": withOpacity("--color-gray-800"),
        "gray-900": withOpacity("--color-gray-900"),
        social: {
          facebook: "#3b5998",
          "facebook-hover": "#35508a",
          twitter: "#1da1f2",
          instagram: "#e1306c",
          youtube: "#ff0000",
          google: "#4285f4",
          "google-hover": "#3574de",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
