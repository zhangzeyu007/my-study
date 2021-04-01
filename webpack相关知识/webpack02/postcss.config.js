/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 12:52:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 15:23:11
 */

module.exports = {
    plugins: [require('autoprefixer')({
        // overrideBrowserslist: [
        //     "last 2 versions",
        //     "> 1%"
        // ]
    }
    ),
    require('pixrem'), require('cssnano')]
}

// npx browserslist "last 2 version, >1%"