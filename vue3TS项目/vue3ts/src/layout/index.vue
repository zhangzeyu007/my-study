<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-29 13:21:23
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-31 16:19:21
 * @FilePath: \vue3ts\src\layout\index.vue
-->
<template>
  <van-sticky ref="stickyRef">
    <van-nav-bar :title="$route.meta?.title">
      <template #left>
        <van-icon name="wap-nav" size="18" />
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </van-sticky>
  <div class="container">
    <router-view #="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <van-tabbar ref="tabbarRef" route>
    <template v-for="item in main" :key="item.name">
      <van-tabbar-item :to="item.path" :icon="item.meta?.icon">
        {{ item.meta?.title }}
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, nextTick, computed } from 'vue'
import { Sticky, Tabbar } from 'vant'
import { main } from '@/router/modules/main'
const route = useRoute()
const stickyRef = ref<InstanceType<typeof Sticky>>()
const tabbarRef = ref<InstanceType<typeof Tabbar>>()
const containerHeight = ref('')

nextTick(() => {
  containerHeight.value = `${
    stickyRef.value?.$el?.offsetHeight + tabbarRef.value?.$el.offsetHeight
  }px`
})
</script>

<style lang="scss">
.container {
  --height: v-bind('containerHeight');
  --container-height: calc(100vh - var(--height));

  height: calc(100vh - var(--height));
  overflow: auto;
}
</style>
