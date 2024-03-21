/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-20 11:21:13
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-21 20:39:42
 * @FilePath: \my-study\节流防抖\debounce.js
 */
function debounce(func, wait, immediate) {
  let timeout, result;
  return function () {
    // 改变内部this的指向
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callnow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      // 立即执行
      if (callnow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }

    return result;
  };
}
