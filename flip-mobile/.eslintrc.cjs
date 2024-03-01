module.exports = {
  env: {
    node: true,
  },
  root: true,
  plugins: ["@typescript-eslint", "prettier", "module-resolver"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
  },
  rules: {
    "no-console": "error",
    "prettier/prettier": "warn",
    "module-resolver/use-alias": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
