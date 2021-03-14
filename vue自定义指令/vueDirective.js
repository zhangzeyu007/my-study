
/*
 * @Description: 自定义指令
 * @Author: 小鱼
 * @Date: 2019-12-31 14:47:18
 * @LastEditors: 小鱼
 * @LastEditTime: 2020-06-09 09:19:20
 */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import Vue from 'vue'
import mintPrompt from '@/components/public/mintPrompt'
let cnzData
function initData() {
    cnzData = window._czc || []
}
// v-action 废弃 尽量不要使用了
// v-action 指令 点击时处理埋点数据
// v-action data-action="{btn:志愿服务}"
Vue.directive('action', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el) {
        el.addEventListener('touchstart', function(ev) {
            if (el.dataset && el.dataset.action) {
                mintPrompt.formatAction(JSON.parse(el.dataset.action))
            }
        }, false)
    }
})

// app上的指令
// v-app-action 指令 点击时处理埋点数据
// v-app-action v-app-action="{btn:志愿服务}"
Vue.directive('app-action', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el, binding) {
        el.addEventListener('click', function(ev) {
            if (binding && binding.value) {
                mintPrompt.formatAction(binding.value)
            }
        }, false)
    }
})

// 重新定义埋点指令
// category 事件类别，必填项，表示事件发生在谁身上，如“视频”、“小说”、“轮显层”等等
// action：事件操作，必填项，表示访客跟元素交互的行为动作，如"播放"、"收藏"、"翻层"等等。
// label：事件标签，选填项，用于更详细的描述事件，从各个方面都可以，比如具体是哪个视频，哪部小说，翻到了第几层等等。
Vue.directive('y-point', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el, binding) {
    // 初始化数据
        if (!cnzData) {
            initData()
        }
        const bindValue = binding.value || {}
        const { category, action, label } = bindValue

        el.addEventListener('touchstart', function(ev) {
            let userId
            if (window.yksapp_user) {
                userId = (yksapp_user.getUserId && yksapp_user.getUserId()) || (yksapp_user.getUserID && yksapp_user.getUserID())
            }
            const labelvalue = (label || '') + (userId || '')
            if (category && category) {
                if (labelvalue) {
                    cnzData.push(['_trackEvent', category, action, labelvalue])
                } else {
                    cnzData.push(['_trackEvent', category, action])
                }
            }
        }, false)
    }
})
