/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-05-04 21:08:56
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 21:11:29
 */
; (function (win) {
    function a() {
        if (parseInt(document.documentElement.clientWidth) > 720) {
            document.documentElement.style.fontSize = 720 / 7.5 + "px";
        } else {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
        }
    }
    var b = null;
    win.addEventListener("resize", function () {
        clearTimeout(b);
        b = setTimeout(a, 300);
    }, !1);
    a();
})(window);