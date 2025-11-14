module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: "latest",
    extraFileExtensions: [".vue"],
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential", 
    "plugin:@typescript-eslint/recommended",
  ],

  rules: {
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": "off",

    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
  },
};