/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-05-04 19:16:24
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 21:22:50
 */

module.exports = {
    root: true,
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            modules: true,
            experimentalObjectRestSpread: true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'space-before-function-paren': 0,
        'no-console': 'off',
    }
}