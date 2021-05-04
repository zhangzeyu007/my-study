<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
export default {
  props: {
    //当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll事件；
    //当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
    //当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件
    probeType: {
      type: Number,
      default: 1,
    },
    // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
    click: {
      type: Boolean,
      default: true,
    },
    tap: {
      type: Boolean,
      default: true,
    },
    // 是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false,
    },
    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false,
    },
    // 列表的数据 数据更新时要重新计算高度
    data: {
      type: Array,
      default: null,
    },
    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false,
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false,
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    // 当数据更新后，刷新scroll的延时。
    refreshDelay: {
      type: Number,
      default: 20,
    },
    // 我们希望横向模拟横向滚动，而纵向的滚动还是保留原生滚动，我们可以设置 eventPassthrough 为 vertical；如果我们希望保留横向的原生滚动，可以设置eventPassthrough为 horizontal
    eventPassthrough: {
      type: String,
      default: "",
    },
  },
  watch: {
    data: {
      handler() {
        setTimeout(() => {
          this.refresh();
        }, this.refreshDelay);
      },
      deep: true,
    },
  },
  mounted() {
    // dom渲染完毕后计算元素的高度
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // 初始化dom
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        tap: this.tap,
        scrollX: this.scrollX,
        eventPassthrough: this.eventPassthrough,
      });
      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on("scroll", (pos) => {
          this.$emit("scroll", pos);
        });
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on("touchEnd", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit("pulldown");
          }
        });
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 启用 better-scroll, 默认 开启。
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 滚动到指定的位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 滚动到指定的目标元素
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
  },
};
</script>

<style scoped></style>
