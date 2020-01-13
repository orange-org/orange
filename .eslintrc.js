module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "airbnb",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __NONCE__: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/extensions": [
      "error",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        json: "allow",
      },
    ],
    "no-unused-vars": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "no-unused-expressions": "off", // Conflicts with TypeScript optional chaining
    "react/jsx-no-undef": "off", // Not needed with TypeScript
    "import/no-unresolved": "off", // Not needed with Typescript
    "react/prop-types": "off", // Not needed with Typescript
    "react/jsx-curly-newline": "off", // Conflicts with Prettier
    "lines-between-class-members": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/jsx-wrap-multilines": "off", // Conflicts with Prettier
    "react/destructuring-assignment": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
