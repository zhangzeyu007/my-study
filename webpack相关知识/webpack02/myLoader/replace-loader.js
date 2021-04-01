/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-01 15:51:53
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-01 17:33:18
 */

// 自定义loader
// loader 就是一个函数 ,不可以是箭头函数
// loader 的 api 都挂载this对象上
// 如果返回多种信息, this.callback
// 如何处理异步逻辑 this.async
// 多个自定义loader

module.exports = function (source) {
    const content = source.replace('我是中国人', '好好笑啊')
    this.callback(null, content)
    console.log('走了');
    // return source.replace("我是中国人", "好好笑");
}