<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-29 13:26:26
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-30 17:08:18
-->
<template>
  <div>
    <div class="luck-wheel">
      <div class="contanier">
        <!-- 标题 -->
        <div class="title"></div>
        <!-- 转盘 -->
        <div class="wheel">
          <div
            class="wheel-bw"
            :style="` transform: rotate(${-90 + 180 / lunkList.length}deg)`"
          >
            <div
              class="goods-img"
              v-for="(item, index) in lunkList"
              :key="index"
              :style="`transform: rotate(${
                (-index * 360) / lunkList.length
              }deg) translateY(1rem);`"
            >
              <img :src="item.img" alt="" />
            </div>
          </div>
          <div class="wheel-row" @click="goStart"></div>
        </div>
        <!-- 活动规则 -->
        <div class="activty-rule">
          <div class="active-title">
            <p>活动规则</p>
          </div>
          <div class="active-detail">
            <h1 class="time">活动时间</h1>
            <p>2016年8月10日——2016年8月20日</p>
            <h1 class="take-part">参与资格 ；</h1>
            <p>1、凡积分满2000分以上即可参与大转盘抽奖一次</p>
            <p>2、在此基础每加100元可多参与一次；</p>
            <p>3、现金消费满88元可参</p>
            <h1 class="award">活动奖励</h1>
            <p class="award-list">
              苹果6手机一台、立式格力空调一台、现金100元、现金500元
            </p>
          </div>
          <img
            class="luckbox"
            src="../../static/image/luckwheel/liwubox.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lunkList: [
        { id: 1, img: require("../../static/image/luckwheel/good1.png") },
        { id: 2, img: require("../../static/image/luckwheel/good2.png") },
        { id: 3, img: require("../../static/image/luckwheel/good2.png") },
        { id: 4, img: require("../../static/image/luckwheel/good2.png") },
        { id: 5, img: require("../../static/image/luckwheel/good2.png") },
        { id: 6, img: require("../../static/image/luckwheel/good1.png") },
        { id: 7, img: require("../../static/image/luckwheel/good2.png") },
        { id: 8, img: require("../../static/image/luckwheel/good2.png") },
        { id: 9, img: require("../../static/image/luckwheel/good2.png") },
        { id: 10, img: require("../../static/image/luckwheel/good2.png") },
      ],
      winner: 2, //指定获奖下标 specified为true时生效
      specified: false, //是否指定获奖结果，false时为随机
      loading: false, //抽奖执行状态，防止用户多次点击
      wheelElement: null,
    };
  },
  computed: {
    animationClass() {
      //对应css样式中定义的class属性值,如果有更多的话可以继续添加  case 8:   return 'wr8'
      switch (this.winner) {
        case 0:
          return "wr0";
        case 1:
          return "wr1";
        case 2:
          return "wr2";
        case 3:
          return "wr3";
        case 4:
          return "wr4";
        case 5:
          return "wr5";
        case 6:
          return "wr6";
        case 7:
          return "wr7";
        case 8:
          return "wr8";
        case 9:
          return "wr9";
        case 10:
          return "wr10";
      }
      return "";
    },
  },
  mounted() {
    //通过获取奖品个数，来改变css样式中每个奖品动画的旋转角度
    // var(--nums) 实现css动画根据奖品个数，动态改变
    let root = document.querySelector(":root");
    root.style.setProperty("--nums", this.lunkList.length);
  },
  methods: {
    goStart() {
      this.start();
    },
    start() {
      if (!this.loading) {
        this.wheelElement = document.querySelector(".wheel-bw");
        this.wheelElement.classList.remove(this.animationClass);
        if (this.specified) {
          //此处可指定后端返回的指定奖品
          // this.winner = this.winner
          this.winCallback();
        } else {
          this.winner = this.random(0, this.lunkList.length - 1);
          this.winCallback();
        }
      }
    },
    //中奖返回方法
    winCallback() {
      setTimeout(() => {
        /* 此处是为了解决当下次抽中的奖励与这次相同，动画不重新执行的 */
        /* 添加一个定时器，是为了解决动画属性的替换效果，实现动画的重新执行 */
        this.wheelElement.classList.add(this.animationClass);
      }, 0);
      // 因为动画时间为 3s ，所以这里3s后获取结果，其实结果早就定下了，只是何时显示，告诉用户
      setTimeout(() => {
        this.loading = false;
        console.log(`恭喜你获得了${this.winner}`);
      }, 1000);
    },
    //随机一个整数的方法
    random(min, max) {
      return parseInt(Math.random() * (max - min + 1) + min);
    },
  },
};
</script>

<style lang="less" scoped>
.luck-wheel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
}
.contanier {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  background: url("../../static/image/luckwheel/zp-1.jpg") no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  .title {
    width: 75%;
    height: 1.1rem;
    margin: 10% 0 0 10%;
    background: url("../../static/image/luckwheel/xingyun.png") no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    z-index: 10;
  }
  .wheel {
    position: relative;
    width: 70%;
    height: 5.12rem;
    margin: 0% 0 0 10%;
    background: url("../../static/image/luckwheel/zhuanpan.png") no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    z-index: 10;
    .wheel-bw {
      position: relative;
      left: 13%;
      top: 6%;
      width: 4rem;
      height: 4rem;
      transform: translate(-50%, -50%);
      background: url("../../static/image/luckwheel/b-w.png") no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      z-index: 10;
      .goods-img {
        width: 0.6rem;
        height: 0.6rem;
        z-index: 100;
        position: absolute;
        top: 1.668748rem;
        left: 1.668748rem;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .wheel-row {
      position: absolute;
      left: 50%;
      right: 50%;
      top: 42%;
      bottom: 50%;
      transform: translate(-42%, -50%);
      width: 1.8rem;
      height: 1.8rem;
      background: url("../../static/image/luckwheel/zhuanpan-row.png") no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      z-index: 100;
    }
  }
  .activty-rule {
    position: relative;
    margin: 0 15px;
    padding: 0px 0 10px 0;
    background-color: rgba(255, 255, 255, 0.2);
    .active-title {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding-top: 10px;
      p {
        padding: 5px 10px;
        font-size: 0.328125rem;
        color: #f87771;
        background-color: #fff;
        display: inline-block;
        box-sizing: border-box;
      }
    }
    .active-detail {
      padding: 0 10px;
      box-sizing: border-box;
      h1 {
        font-size: 0.328125rem;
        color: #fff;
      }
      p {
        font-size: 0.257812rem;
        color: #fff;
        padding-bottom: 5px;
      }
      .time {
        padding: 15px 0 10px 0;
        box-sizing: border-box;
      }
      .take-part {
        padding: 10px 0px 10px 0px;
        box-sizing: border-box;
      }
      .award {
        padding: 10px 0px 10px 0px;
        box-sizing: border-box;
      }
      .award-list {
        width: 4.7rem;
        line-height: 16px;
      }
    }
    .luckbox {
      position: absolute;
      width: 1.874999rem;
      height: 1.874999rem;
      right: 5px;
      bottom: -20px;
    }
  }
}

@time: 5s; //转动多少秒后停下的时间
/* 下面的css样式为每个奖品的旋转动画，这里写了对应10个奖品的动画，如果想要更多的话，可以添加 */
/* 例如： .wr10  @keyframes play8 */
.wr0,
.wr1,
.wr2,
.wr3,
.wr4,
.wr5,
.wr6,
.wr7 {
  animation-duration: @time;
  animation-timing-function: ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
}
.wr0 {
  animation-name: play0;
}
.wr1 {
  animation-name: play1;
}
.wr2 {
  animation-name: play2;
}
.wr3 {
  animation-name: play3;
}
.wr4 {
  animation-name: play4;
}
.wr5 {
  animation-name: play5;
}
.wr6 {
  animation-name: play6;
}
.wr7 {
  animation-name: play7;
}
.wr8 {
  animation-name: play8;
}
.wr9 {
  animation-name: play9;
}
.wr10 {
  animation-name: play10;
}
@keyframes play0 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 0));
  }
}
@keyframes play1 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 1));
  }
}
@keyframes play2 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 2));
  }
}
@keyframes play3 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 3));
  }
}
@keyframes play4 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 4));
  }
}
@keyframes play5 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 5));
  }
}
@keyframes play6 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 6));
  }
}
@keyframes play7 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 7));
  }
}
@keyframes play8 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 8));
  }
}
@keyframes play9 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 9));
  }
}
@keyframes play10 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 10));
  }
}
</style>
