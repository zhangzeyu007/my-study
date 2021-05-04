<template>
  <div id="swiper">
    <div
      class="wrap"
      :style="{ width: imgWidth + 'px' }"
      @mouseover="stop"
      @mouseleave="play"
    >
      <ul class="container" :style="containerStyle">
        <li>
          <!-- 把最后一张图放在最开始 -->
          <img
            :style="{ width: imgWidth + 'px' }"
            :src="sliders[sliders.length - 1].img"
            alt=""
          />
        </li>
        <li v-for="(item, index) in sliders" :key="index">
          <img :style="{ width: imgWidth + 'px' }" :src="item.img" alt="" />
        </li>
        <li>
          <!-- 把第一张图放在最后 -->
          <img
            :style="{ width: imgWidth + 'px' }"
            :src="sliders[0].img"
            alt=""
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "mySwiper",
  props: {
    imgWidth: {
      type: Number,
    },
    initialSpeed: {
      type: Number,
      default: 20,
    }, // 图片移动速度
    initialInterval: {
      type: Number,
      default: 1,
    }, // 如果是一个组件 接受外部传入的切换周期
  },
  data() {
    return {
      sliders: [
        {
          img:
            "http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658",
        },
        {
          img: require("../../static/image/banner1.png"),
        },
      ], // 放图片的数组
      currentIndex: 1, // 原点起始位置
      distance: -600, // 外层嵌套的初始移动距离
      transitionEnd: true, // 防止多次快速点击切换出现问题的闸门
      speed: this.initialSpeed,
      timer: null, // 定时器
    };
  },
  watch: {
    imgWidth() {
      this.init();
    },
  },
  computed: {
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`,
      };
    },
    interval() {
      return this.initialInterval * 1000;
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.slideBanner();
  },
  methods: {
    init() {
      this.play();
    },
    move(offset, direction, speed) {
      // 移动一次的距离， 向左还是向右移动， 图片移动速度
      if (!this.transitionEnd) return;
      this.transitionEnd = false;
      direction === -1
        ? (this.currentIndex += offset / this.imgWidth)
        : (this.currentIndex -= offset / this.imgWidth);
      if (this.currentIndex > this.sliders.length) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = this.sliders.length;
      const destination = this.distance + offset * direction;
      this.animate(destination, direction, speed);
    },
    animate(des, direc, speed) {
      // 实际移动距离 想左还是向右 移动速度 负右正左
      if (this.temp) {
        window.clearInterval(this.temp);
        this.temp = null;
      }
      this.temp = window.setInterval(() => {
        if (
          (direc === -1 && des < this.distance) ||
          (direc === 1 && des > this.distance)
        ) {
          this.distance += speed * direc;
        } else {
          this.transitionEnd = true;
          window.clearInterval(this.temp);
          this.distance = des;
          let allWidth = this.sliders.length * this.imgWidth;
          if (des < -allWidth) this.distance = -this.imgWidth;
          if (des > -this.imgWidth) this.distance = -allWidth;
        }
      }, 50);
    },
    // 自动播放函数
    play() {
      if (!this.maskBol) {
        if (this.timer) {
          window.clearInterval(this.timer);
          this.timer = null;
        }
        this.timer = window.setInterval(() => {
          this.move(this.imgWidth, -1, this.speed);
        }, this.interval);
      }
    },
    stop() {
      window.clearInterval(this.timer);
      this.timer = null;
    },
    slideBanner() {
      let that = this;
      //选中item的盒子
      var box = document.querySelector(".wrap");
      //手指起点X坐标
      var startPoint = 0;
      //手指滑动重点X坐标
      var stopPoint = 0;
      //重置坐标
      var resetPoint = function () {
        startPoint = 0;
        stopPoint = 0;
      };
      // 手指按下
      box.addEventListener("touchstart", function (e) {
        //手指按下的时候停止自动轮播
        that.stop();
        //手指点击位置的X坐标
        startPoint = e.changedTouches[0].pageX;
      });
      //手指滑动
      box.addEventListener("touchmove", function (e) {
        //手指滑动后终点位置X的坐标
        stopPoint = e.changedTouches[0].pageX;
      });
      // 当手指抬起的时候，判断图片滚动离左右的距离
      box.addEventListener("touchend", function () {
        if (stopPoint == 0 || startPoint - stopPoint == 0) {
          resetPoint();
          return;
        }
        if (startPoint - stopPoint > 0) {
          resetPoint();
          console.log("左");
          setTimeout(() => {
            that.play();
          }, 5000);
          that.move(that.imgWidth, -1, that.speed);
          return;
        }
        if (startPoint - stopPoint < 0) {
          resetPoint();
          console.log("右");
          setTimeout(() => {
            that.play();
          }, 5000);
          that.move(that.imgWidth, 1, that.speed);
          return;
        }
      });
    },
  },
};
</script>
<style lang="less">
ol,
ul {
  list-style: none;
}
#swiper {
  text-align: center;
  .wrap {
    position: relative;
    height: 4.27734rem;
    margin: 0 auto;
    overflow: hidden;
    .container {
      display: flex;
      position: absolute;
    }
    img {
      user-select: none;
    }
  }
}
</style>
