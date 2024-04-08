<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2022-05-27 11:21:51
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-08 12:41:28
 * @FilePath: \my-study\虚拟滚动组件\VirtualList.vue
-->

<template>
  <div
    ref="list"
    class="list-container"
    @scroll="scrollEvent($event)"
    :style="{ height: screenHeight + 'px' }"
  >
    <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="list" :style="{ transform: getTransform }">
      <!-- 内容展示组件 -->
      <acticle-item
        class="article-item"
        v-for="item in visibleData"
        :key="item._id"
        :article="item"
        :style="{ height: size + 'px' }"
      >
      </acticle-item>
    </div>
  </div>
</template>

<script>
import ActicleItem from "./ArticleItem";

export default {
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      screenHeight: 600,
      startOffset: 0,
      start: 0, // 开始索引
      end: 4, // 结束的索引
    };
  },

  components: {
    ActicleItem,
  },

  computed: {
    //列表总高度
    listHeight() {
      return this.listData.length * this.size;
    },
    //可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.size);
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      );
    },
  },

  activated() {
    this.startOffset = 0;
  },

  mounted() {
    // 获取可视屏幕的高度
    this.screenHeight = window.innerHeight - 50;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  methods: {
    scrollEvent() {
      // 当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      // 此时的开始索引
      this.start = Math.floor(scrollTop / this.size);
      // 此时的结束索引
      this.end = this.start + this.visibleCount;
      // 此时的偏移量
      /*
      对齐行高度: 由于滚动位置的偏移量 scrollTop 可能不是行高度 this.rowHeight 的整数倍,
       因此需要将其对行高度取余,以确保 startOffset 总是从一个完整的行的顶部开始。
      这样可以保证每个渲染的列表项都是完整的,避免出现视觉上的断层。
      精确定位: 如果不进行取模运算,而直接使用原始的 scrollTop 作为起始偏移量,
      可能会导致第一个渲染的列表项出现在视窗中间或其他位置,而不是从视窗顶部开始渲染。
      通过取模运算,我们可以确保第一个渲染的列表项总是从视窗顶部开始,提高了定位的精确性
      */
      this.startOffset = scrollTop - (scrollTop % this.size);
    },
  },
};
</script>

<style lang="less" scoped>
.list-container {
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}

.article-item {
  margin-top: 10px;
}
</style>
