module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "airbnb",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaVersion: 12,
    ecmaFeatures: {
      globalReturn: false,
      jsx: true,
    },
    babelOptions: {
      configFile: "./babel.config.json",
    },
  },
  plugins: [
    "import",
    "jest",
    "@babel",
  ],
  rules: {
    "no-return-assign": [
      "error",
      "except-parens",
    ],
    "no-console": "off",
    quotes: [
      "error",
      "double",
    ],
    "react/prop-types": 0,
    "linebreak-style": "off",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "jest/no-hooks": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
        ],
      },
    },
  },
  overrides: [
    {
      files: [
        "**/*.jsx",
      ],
      extends: [
        "plugin:react/recommended",
      ],
      plugins: [
        "react",
        "react-hooks",
        "testing-library",
        "jsx",
        "jsx-a11y",
        "jest-dom",
      ],
      rules: {
        "react/prop-types": 0,
        "linebreak-style": ["error", "unix"],
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        "react/function-component-definition": ["error", {
          namedComponents: "arrow-function",
          unnamedComponents: "function-expression",
        }],
      },
      settings: {
        "import/resolver": {
          node: {
            extensions: [
              ".jsx",
            ],
          },
        },
      },
    },
    {
      files: [
        "**/*.test.js",
      ],
      env: {
        jest: true, // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:jest/all",
      ],
      plugins: [
        "jest",
      ],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
      },
    },
  ],
};
