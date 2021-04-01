/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 15:51:53
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 16:41:31
 */

// 自定义loader
// loader 就是一个函数 ,不可以是箭头函数
// loader 的 api 都挂载this对象上
// 如果返回多种信息, this.callback
// 如何处理异步逻辑 this.async
// 多个自定义loader
module.exports = function (source) {
    const callback = this.async()
    setTimeout(() => {
        const content = source.replace('hello', '你好' + this.query.name)
        callback(null, content)
    }, 3000)
}