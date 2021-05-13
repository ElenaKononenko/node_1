module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: ["standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "comma-dangle": "off",
  },
};
