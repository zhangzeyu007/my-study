/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-18 22:06:50
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-29 10:17:06
 */
/**
 * 适配移动端
 * 物理像素，比较好理解，一个物理像素是显示器(手机屏幕)上最小的物理显示单元，
 * 在操作系统的调度下，每一个设备像素都有自己的颜色值和亮度值。
 * */
// document.documentElement.style.fontSize = document.documentElement.clientWidth || document.body.clientWidth / 7.5 + 'px';
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = clientWidth / 7.5 + "px";
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
