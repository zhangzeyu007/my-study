<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-27 14:33:44
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-30 16:17:00
-->
<template>
  <div class="community-bank">
    <div class="container">
      <common-scroll
        ref="scroll"
        class="common-scroll"
        :data="dataList"
        :probe-type="2"
        :pullup="true"
        :pulldown="true"
        @pulldown="pulldown"
        @scrollToEnd="scrollToEnd"
      >
        <div class="main-list">
          <template>
            <div class="showLoad" v-show="showLoad">
              <img class="icon-load" src="../assets/Load.gif" alt="" />
            </div>
          </template>
          <div
            class="community-item"
            v-for="(item, index) of dataList"
            :key="index"
          >
            <p>{{ item.title }}</p>
            <div class="show">
              <img v-bind:src="item.imgUrl" />
              <p>{{ item.site }}</p>
            </div>
            <div class="border-1px"></div>
          </div>
        </div>
      </common-scroll>
    </div>
  </div>
</template>

<script>
import CommonScroll from "../components/commonScroll";

export default {
  data() {
    return {
      showLoad: false,
      dataList: [],
      addData: [],
    };
  },
  components: {
    CommonScroll,
  },
  created() {
    this.getBankData();
  },
  methods: {
    getBankData() {
      this.addData = [];
      this.$api.bank.getBankData().then((result) => {
        if (result.status == 200 && result.data) {
          this.addData = result.data;
          this.dataList = result.data;
        }
      });
    },
    pulldown() {
      this.showLoad = true;
      setTimeout(() => {
        this.showLoad = false;
      }, 1000);
      this.getBankData();
      console.log("下拉刷新");
      this.$refs.scroll.refresh();
    },
    scrollToEnd() {
      console.log("上拉加载");
      this.dataList = this.dataList.concat(this.addData);
      console.log(this.dataList);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}
.common-scroll {
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.main-list {
  position: relative;
  width: 100%;
  padding: 15px;
  z-index: 50;
  box-sizing: border-box;
}
.community-item {
  padding: 10px 0px;
  box-sizing: border-box;
  > p {
    padding: 10px 0;
    font-weight: 400;
    font-size: 0.28125rem;
    color: #8f9093;
    box-sizing: border-box;
  }
  .show {
    position: relative;
    height: 3.515622rem;
    overflow: hidden;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
    > p {
      position: absolute;
      left: 5px;
      bottom: 10px;
      color: #fff;
      font-size: 0.1875rem;
    }
  }
}
.border-1px {
  margin-top: 20px;
  width: 100%;
  height: 1px;
  background-color: #ededed;
}
.showLoad {
  text-align: center;
}
.icon-load {
  width: 50px;
  height: 50px;
}
</style>
