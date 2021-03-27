<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-27 13:02:21
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-27 17:51:29
-->
<template>
  <!-- module css 的使用方法 -->
  <div class="about">
    <h1>module css 的使用方法</h1>
    <h1 :class="$style.red">This is an about page</h1>
    <p :class="{ [$style.red]: isRed }">This is an about page</p>
    <p :class="[$style.red, $style.blod]">This is an about page</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRed: true,
    };
  },
};
</script>

<style lang="scss" module>
.red {
  color: red;
}
.blod {
  font-weight: 800;
}
</style>