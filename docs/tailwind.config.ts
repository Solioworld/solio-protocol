import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './src/theme.config.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
