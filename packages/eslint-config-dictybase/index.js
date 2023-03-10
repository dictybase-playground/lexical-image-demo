module.exports = {
  extends: [
    "react-app",
    "airbnb",
    "airbnb/hooks",
    "plugin:github/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "plugin:compat/recommended",
    "prettier",
  ],
  env: {
    browser: true,
  },
  globals: {
    vi: true,
    JSX: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "class-methods-use-this": "off",
    "import/no-unresolved": "error",
    "no-underscore-dangle": "off",
    "lines-between-class-members": "off",
    quotes: ["off", "single"],
    semi: ["error", "never"],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { args: "after-used", ignoreRestSiblings: false },
    ],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".tsx", ".ts"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
      },
    ],
    "filenames/match-regex": "off",
    "github/array-foreach": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-for-of": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-null": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          snakeCase: true,
        },
      },
    ],
    "i18n-text/no-en": "off",
    "eslint-comments/no-use": [
      "error",
      { allow: ["eslint-disable", "eslint-disable-next-line"] },
    ],
    "unicorn/no-new-array": "off",
  },
}
