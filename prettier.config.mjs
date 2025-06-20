/** @type {import("prettier").Config} */

const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  importOrder: ["^@/(.*)$", "^@mold-link/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindConfig: "tailwind.config.cjs"
};

export default config;
