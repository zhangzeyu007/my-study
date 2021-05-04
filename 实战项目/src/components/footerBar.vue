<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-28 09:42:51
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-29 17:11:12
-->
<template>
  <div class="footer-bar">
    <div class="item" @click="goBank">
      <icon-font icon-class="gongyingshang"></icon-font>
      <p>支行介绍</p>
    </div>
    <div class="item" @click="goDetaill">
      <icon-font icon-class="yewukaohe"></icon-font>
      <p>合作商户</p>
    </div>
    <div class="item" @click="goBusiness">
      <icon-font icon-class="yiqifafang"></icon-font>
      <p>便利社区</p>
    </div>
    <div class="item" @click="goWheel">
      <icon-font icon-class="zizhinengli"></icon-font>
      <p>我的账户</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBank() {
      this.$router.push({ path: "/communitybank" });
    },
    goDetaill() {
      this.$router.push({ path: "/communitydetail" });
    },
    goBusiness() {
      this.$router.push({ path: "/communitybusiness" });
    },
    goWheel() {
      this.$router.push({ path: "/luckywheel" });
    },
  },
};
</script>

<style scoped lang="less">
.footer-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.136718rem;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  border: 1px solid #e6e6e6;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e6e6e6;
    font-size: 0.234375rem;
    color: #7b7c80;
    p {
      padding-top: 2px;
    }
  }
}
</style>
