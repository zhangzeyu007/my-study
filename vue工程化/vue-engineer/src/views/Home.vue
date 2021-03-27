<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 13:02:21
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 17:39:54
-->
<template>
  <div class="home">
    {{ `${publicpath}` }}
    <!-- <img alt="Vue logo" :src="`${publicpath}assets/logo.png`" /> -->
    <icon-font class="hello"></icon-font>
  </div>
</template>

<script>
import IconFont from "../components/IconFont.vue";
export default {
  name: "Home",
  data() {
    return {
      publicpath: process.env.BASE_URL,
    };
  },
  components: {
    IconFont,
  },
};
</script>
<style  scoped>
.hello {
  border: 5px solid darkgreen;
}
/* 深层选择 */
.hello >>> h1 {
  color: aquamarine;
}

.hello h2 {
  color: bisque;
}
</style>

<style lang="scss"  scoped>
.hello {
  border: 5px solid darkgreen;
}
/* 深层选择 在 Sass less 中无法解析 >>> 可以使用 /deep/ ::v-deep*/
.hello >>> h1 {
  color: red;
}

/deep/.hello h2 {
  color: bisque;
}
::v-deep h3 {
  color: greenyellow;
}
</style>
