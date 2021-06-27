<template>
    <div v-click-outside>
        <input type="text" :value="formatDate" @focus="focus" @blur="blur">
        <div v-if="isVisible">content</div>
    </div>
</template>

<script>
import * as utils from '../util/util.js'

export default {
    directives: {
        clickOutside: { // 指令的生命周期
            bind() {}
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

<style lang="stylus" scoped></style>
