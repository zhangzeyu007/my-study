/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-05-04 21:27:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 21:30:03
 */
!function (win) {
    function a() {
        console.log(navigator.userAgent);
        if (/MailMaster/.test(navigator.userAgent) && /android/i.test(navigator.userAgent)) {
            if (parseInt(document.documentElement.clientWidth) > 720) {
                document.documentElement.style.fontSize = 720 / 7.5 + "px";
            } else {
                document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
            }
        } else {
            if (parseInt(document.documentElement.clientWidth) > 720) {
                document.documentElement.style.fontSize = 720 / 750 * 10 / 16 * 1000 + "%";
            } else {
                document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 * 10 / 16 * 1000 + "%";
            }
        }
    }
    var b = null;

    win.addEventListener("resize", function () {
        clearTimeout(b);
        b = setTimeout(a, 300);
    }, !1);
    a();
}(window);
