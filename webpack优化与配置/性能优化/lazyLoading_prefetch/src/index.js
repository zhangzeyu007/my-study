/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-07-13 13:19:11
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-11 13:10:00
 * @FilePath: \my-study\webpack优化与配置\性能优化\lazyLoading_prefetch\src\index.js
 */
// import { mul } from './test'

/*
    组建懒加载：用代码分割的方式。在触发某个事件后 import() 组建代码
    预加载：prefetch, 会在使用之前提前加载js文件
        正常加载：是并行加载，同以时间加载多个文件，
        同时加载文件的数量有上线所以文件越多加载越慢
        预加载：等其他资源加载完毕后，利用浏览器的空闲时间预先加载
        预加载等缺点：
        只有在高版本等 pc 浏览器上才可以用，移动端或者低版本等浏览器不兼容
        npm install webpack-plugin-preload-link --save-dev
*/
document.getElementById("btn").onclick = () => {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */ "./test")
    .then(({ mul }) => {
      console.log("文件加载成功！");
      console.log(mul(2, 4));
    })
    .catch(() => {
      // console.log('文件加载失败')
    });
};
