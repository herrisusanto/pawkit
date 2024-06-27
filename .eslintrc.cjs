module.exports = {
  env: {
    node: true,
    "jest/globals": true,
  },
  extends: [
    "universe/native",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/order": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
