<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <ul>
    <li>
      <!-- <router-link to="/">首页</router-link> -->
      <NaviLink to="/"></NaviLink>
    </li>
    <li>
      <NaviLink to="/about"></NaviLink>
      <!-- <router-link to="/about">About</router-link> -->
    </li>
    <li>
      <NaviLink to="/about/info"></NaviLink>
      <!-- <router-link to="/about">About</router-link> -->
    </li>
  </ul>
  <router-view v-slot="{ Component }"> 
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script>
import NaviLink from "./components/NaviLink.vue";
export default {
  name: "App",
  components: {
    NaviLink,
  },
};
</script>
