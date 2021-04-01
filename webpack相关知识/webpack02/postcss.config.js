/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 12:52:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 14:25:16
 */

module.exports = {
    plugins: [require('autoprefixer')({
        overrideBrowserslist: [
            "last 2 versions",
            "> 1%"
        ]
    }
    )]
}