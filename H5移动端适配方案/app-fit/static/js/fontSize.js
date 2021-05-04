/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-05-04 19:08:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 20:56:26
 */
; (function (win) {
    var doc = win.document
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]')
    // 设备像素比
    var devicePixelRatio = win.devicePixelRatio;
    console.log(metaEl);
    console.log(devicePixelRatio);

    // var dor = 0
    // var scale = 0
    // var tid;

    // if (metaEl) {

    // }
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width
        var ua = navigator.userAgent.toLocaleLowerCase()

        // 在ua里,找不到ipad的时候执行
        if (!/ipad/.test(ua)) {
            // 375 /2 ,不大于750 , 所以不执行if里
            if (width / devicePixelRatio > 750) {
                width = 750 * devicePixelRatio
            }

        }
    }
    refreshRem()


})(window)