module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'standard',
    'plugin:json/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'global-require': 0,
    'vue/multi-word-component-names': 0
  }
}
