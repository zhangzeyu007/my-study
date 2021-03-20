/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-20 14:19:21
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-20 15:29:07
 */
// 时间戳节流
// 第一次执行, 最后一次不会处发函数
// leading:true trailing:false
// function throttle(func, wait) {
//     let context, args;
//     // 之前的时间戳
//     let old = 0;
//     return function () {
//         context = this
//         args = arguments
//         // 获取当前的时间戳
//         let now = new Date().valueOf();
//         if (now - old > wait) {
//             // 立即执行
//             func.apply(context, args)
//             old = now;
//         }
//     }
// }

// 第一次不执行, 最后一次会处发函数 leading:false trailing:true
// 
function throttle(func, wait, options) {
    let context, args, timeout;
    let old = 0;
    if (!options) options = {}
    let later = function () {
        old = new Date().valueOf()
        timeout = null
        func.apply(context, args)
    }
    return function () {
        context = this
        args = arguments
        // 获取当前的时间戳
        let now = new Date().valueOf();
        console.log(options.leading);
        if (options.leading === false && !old) {
            old = now
        }
        if (now - old > wait) {
            // 第一次会直接执行
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            // 立即执行
            func.apply(context, args)
            old = now;
            console.log(options.trailing);
        } else if (!timeout && options.trailing !== false) {
            // 最后一次也会被执行
            timeout = setTimeout(later, wait)
        }
    }
}