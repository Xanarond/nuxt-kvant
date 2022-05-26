module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier', '@nuxtjs/eslint-config-typescript'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-undef': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'comma-dangle': 'off',
    'no-debugger': 'off',
    'vue/return-in-computed-property': 'off',
    'no-useless-return': 'off'
  },
}
