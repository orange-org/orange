module.exports = {
  env: {
    "jest/globals": true,
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
  plugins: ["react", "@typescript-eslint", "import", "react-hooks", "jest"],
  rules: {
    "react/destructuring-assignment": "off", // to allow `props.whateverProp`
    "no-console": "error",
    "import/no-extraneous-dependencies": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-props-no-spreading": "off",
    "no-underscore-dangle": "off",
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
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/jsx-one-expression-per-line": "off",

    /**
     * The following rules conflict with TypeScript
     */
    "no-unused-expressions": "off", // Conflicts with TypeScript optional chaining
    "react/jsx-no-undef": "off",
    "import/no-unresolved": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": 2,
    "no-unused-vars": "off",
    "no-prototype-builtins": "off",

    /**
     * The following rules conflict with Prettier
     */
    "react/jsx-curly-newline": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-indent": "off",
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
