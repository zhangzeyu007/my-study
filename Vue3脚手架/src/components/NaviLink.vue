<template>
  <div :class="{ active: isActive }" @click="navigate">
    {{ route.name }}
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { RouterLink, useLink } from "vue-router";

export default {
  props: {
    ...RouterLink.props,
    inactiveClass: String,
  },
  setup(props) {
    // 获取RouterLink 内部属性方法
    const { route, href, isActive, navigate } = useLink(props);
    // console.log(route, href, isActive, navigate);
    const state = reactive({});
    return {
      ...toRefs(state),
      route,
      isActive,
      navigate,
    };
  },
};
</script>
<style scoped>
.active {
  background-color: lightgoldenrodyellow;
}
</style>