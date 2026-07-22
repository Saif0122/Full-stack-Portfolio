import nextConfig from "eslint-config-next/core-web-vitals";
import nextTsConfig from "eslint-config-next/typescript";

const config = [
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "public/**",
      "**/*.d.ts",
      "next-env.d.ts"
    ]
  },
  ...nextConfig,
  ...nextTsConfig,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn"
    }
  }
];

export default config;

