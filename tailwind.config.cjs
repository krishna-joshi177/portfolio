module.exports = {
  content: [
    './index.html',
    './index.jsx',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
