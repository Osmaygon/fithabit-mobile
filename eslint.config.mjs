import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  globalIgnores(["public/sw.js", "public/workbox-*.js", ".next/**", "node_modules/**"]),
];

export default eslintConfig;
