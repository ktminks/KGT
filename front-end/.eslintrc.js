module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "plugin:react/recommended",
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
    "testing-library",
    "jsx",
    "jsx-a11y",
    "import",
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
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },

  overrides: [
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
        "jest-dom",
      ],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "jest/no-hooks": "off",
      },
    },
  ],
};
