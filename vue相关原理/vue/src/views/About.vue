<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-10-09 17:36:17
 * @LastEditors: 海象
 * @LastEditTime: 2020-12-26 14:00:55
-->
<template>
  <div class="main-box">
    About
    {{ num | getOrderStatus }}

    <div class="box"></div>
    <div class="box-text">你好的码</div>
    <!-- <div class="form">
      <h1 class="fancy">我是好人</h1>
      <div class="logo">dsffd</div>
      <div class="pic">
        <h1>dfsfdf</h1>
      </div>

      <h1>第三</h1>
    </div>
    <div class="about">
      <a href="" title="多岁的">张再也不</a>
      <h2>哈哈哈哈哈</h2>
      <img src="" />
    </div>
    <div class="main">
      <ol>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <p>我的货</p>
        <h1>哈哈哈哈</h1>
      </ol>
      <p>
        我的中国。吗
        ，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，......................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................
      </p>
      <ul>
        <p>我的</p>
        <p>我的</p>
        <p>我的</p>
        <p>我的</p>
        <p class="fancy">我的</p>
      </ul>
    </div> -->
  </div>
</template>

<script>
// import Home from "./Home.vue";
export default {
  // components: { Home },
  data() {
    return {
      num: 10,
      arr: [1, 2, 3],
      obj: { a: 1, b: 2, c: 3 }
    };
  },
  filters: {
    getOrderStatus(value) {
      return value + "hhaha";
    }
  },
  mounted() {
    console.log(this.arr.includes(1) + "好贱啊加号");
    Object.values(this.obj).map(item => {
      console.log(item);
    });
    Object.keys(this.obj).map(key => {
      console.log(key);
    });
    Object.entries(this.obj).map(item => {
      console.log(item);
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import url("../static/css/main.less");
@width: 10px;
@width1: 0.5;
@var: 50vh/2;

.bordered {
  border-top: dotted 1px red;
  border-bottom: solid 2px red;
}
.form {
  display: flex;
  justify-content: center;
  width: calc(50% + (@var - 20px));
  height: 100px;
  background-color: #333;
  position: relative;
  .bordered();
  .logo {
    width: 50px;
    height: 50px;
    background-color: olivedrab;
    position: absolute;
    left: 10px;
    top: 30px;
  }
  .pic {
    width: percentage(@width1);
    height: 50px;
    background-color: aqua;
  }
}
// @min768: ~"(min-width: 768px)";
// .logo {
//   @media @min768 {
//     font-size: 5rem;
//   }
// }

@media screen {
  .logo {
    font-size: 5rem;
  }
}
// @supports (display: flex) {
//   h1 {
//     color: red;
//   }
// }
@media screen and (max-width: 756px) {
  @supports (disply: flex) {
    .pic {
      background-color: red;
    }
  }
}
.fancy {
  font-size: 24px;
  text-decoration: line-through;
  vertical-align: middle;
  color: #000;
}
</style>
