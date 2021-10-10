module.exports = {
  env: {
    browser: true,
    es2021: true,
    // "jest/globals": true,
  },
  extends: [
    "plugin:react/recommended",
    // "plugin:jest/recommended",
    // "plugin:jest/style",
    // "plugin:jest/all",
    "airbnb",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: `${__dirname}/babel.config.json`,
    },
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "jsx",
    "jsx-a11y",
    "import",
    // "jest",
    "@babel",
  ],
  rules: {
    "no-console": "off",
    quotes: [
      "error",
      "double",
    ],
    "react/prop-types": 0,
    "linebreak-style": "off",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    // "jest/no-disabled-tests": "warn",
    // "jest/no-focused-tests": "error",
    // "jest/no-identical-title": "error",
    // "jest/prefer-to-have-length": "warn",
    // "jest/valid-expect": "error",
  },
};
