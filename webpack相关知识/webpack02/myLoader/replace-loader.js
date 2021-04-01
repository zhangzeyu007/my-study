/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 15:51:53
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 15:59:20
 */


// 自定义loader
// loader 就是一个函数 ,不可以是箭头函数

module.exports = function (source) {
    console.log(source);
    return source
}