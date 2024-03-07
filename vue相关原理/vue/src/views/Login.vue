<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-13 11:35:42
 * @LastEditors: 海象
 * @LastEditTime: 2020-12-26 13:44:35
-->
<template>
  <div>
    <input type="text" v-model="username" />
    <button @click="login">登入</button>
    <div class="box">
      <div class="point"></div>
      <div class="point"></div>
    </div>
    <p @click="$store.commit('add')">counnter:{{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">加法</p>
    <p @click="changeMin">减法</p>
    <p>async counnter:{{ $store.state.counter }}</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    ...mapActions([
      "min" // 将 `this.min()` 映射为 `this.$store.dispatch('min')`
    ]),
    changeMin() {
      this.min();
    },
    login() {
      this.$store
        .dispatch("user/login", { username: this.username })
        .then(() => {
          console.log(this.$route.query.redirect);
          this.$router.push({
            path: this.$route.query.redirect || "/"
          });
        });
    }
  }
};
</script>
<style scoped>
.box {
  width: 100px;
  height: 100px;
  border: 1px solid darkcyan;
  border-radius: 5%;
  display: flex;
  justify-content: space-between;
}
.point {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: darkred;
  display: inline-block;
  margin: 5px;
}
.box .point:nth-child(2) {
  align-self: flex-end;
}
</style>
