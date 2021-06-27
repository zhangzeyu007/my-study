<template>
    <div v-click-outside>
        <input type="text" :value="formatDate" @focus="focus" @blur="blur">
        <div v-if="isVisible" class="pannel">
            <div class="pannel-nav">
                <span>&lt;</span>
                <span>&lt;&lt;</span>
                <span>xx年</span>
                <span>xx月</span>
                <span>&gt;&gt;</span>
                <span>&gt;</span>
            </div>
            <div class="pannel-content">content</div>
            <div class="pannel-footer">今天</div>
        </div>
    </div>
</template>

<script>
import * as utils from '../util/util.js'

export default {
    directives: {
        clickOutside: {
            // 指令的生命周期
            bind(el, bindings, vnode) {
                // context
                // 把事件绑定给document上 看一下是否在当前元素内部
                let handler = e => {
                    console.log(e.target)
                    if (el.contains(e.target)) {
                        // 判断一下是否当前面板已经显示出来了
                        if (!vnode.context.isVisible) {
                            vnode.context.focus()
                        }
                    } else {
                        if (vnode.context.isVisible) {
                            vnode.context.blur()
                        }
                    }
                }
                el.handler = handler
                document.addEventListener('click', handler)
            },
            unbind(el) {
                document.addEventListener('click', el.handler)
            }
        }
    },
    props: {
        value: {
            type: Date,
            default: () => new Date()
        }
    },
    data() {
        return {
            isVisible: false // 这个变量是来控制这个面板是否可见
        }
    },
    computed: {
        formatDate() {
            let { year, month, day } = utils.getYearMonthDay(this.value)
            return `${year}-${month}-${day}`
        },
        visibeDays() {
            // 现获取当前是周几
            let { year, month } = utils.getYearMonthDay(this.value)
            // 获取当前月份的第一天
            let currentFirstDay = utils.getDate(year, month, 1)
            // 先生成一个当前 2019 5 18 2019 5 1
            // 获取当前是周几 把天数往前移动 几天
            // 循环42天
            return ''
        }
    },
    methods: {
        focus() {
            this.isVisible = true
        },
        blur() {
            this.isVisible = false
        }
    }
}
</script>

<style scoped lang="less">
.pannel {
  position: absolute;
}
</style>
