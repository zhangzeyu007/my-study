/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-20 11:21:13
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-20 13:12:43
 */

function debounce(func, wait, immediate) {
    let timeout, result;
    return function () {
        // 改变内部this的指向
        let context = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            let callnow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            // 立即执行
            if (callnow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }

        return result
    }
}