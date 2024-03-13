/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-04 19:20:38
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-12 14:05:11
 * @FilePath: \vue3-warter\.eslintrc.cjs
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'stylelint'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // ...
    'stylelint/rules-of-styleline': 'error'
  }
}
