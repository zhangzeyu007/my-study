<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-05-04 15:05:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-05-04 21:26:11
-->
<template>
  <div class="home">我是中国人</div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // wode
      book: {
        name: "",
      },
    };
  },
};
</script>

<style  scope>
.home {
  font-size: 0.32rem;
  color: #333;
  line-height: 0.48rem;
  margin-bottom: 0.04rem;
  font-weight: 700;
}
</style>
