<!--
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-07-19 20:16:18
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-13 20:43:43
 * @FilePath: \my-study\vue生命周期执行顺序\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <child-compent ref="children"></child-compent>
  </div>
</template>

<script>
import ChildCompent from "../components/child.vue";

export default {
  components: {
    ChildCompent
  },

  beforeCreate() {
    console.log("beforeCreate parent");
  },

  created() {
    console.log("created parent---*****");
  },

  beforeMount() {
    console.log("beforeMount parent");
  },

  mounted() {
    console.log("mounted parent");
    console.log(this.$refs.children);
    console.log("----parent-----");
    this.$refs.children.go();
  },

  beforeUpdate() {
    console.log("beforeUpdate parent");
  },

  updated() {
    console.log("update parent");
  },

  beforeDestroy() {
    console.log("beforeDestroy parent");
  },

  destroyed() {
    console.log("destroyed parent");
  },

  methods: {
    goto() {
      console.log("子调用的");
    }
  }
};
/**
 * 在 Vue 2 中,当一个父组件和子组件都定义了相同的生命周期钩子函数时,它们的执行顺序是有规律的。
 * 下面是父组件和子组件生命周期钩子函数的执行顺序总结:

1. 渲染阶段
父组件的 beforeCreate 钩子函数
父组件的 created 钩子函数
父组件的 beforeMount 钩子函数
子组件的 beforeCreate 钩子函数
子组件的 created 钩子函数
子组件的 beforeMount 钩子函数
子组件的 mounted 钩子函数
父组件的 mounted 钩子函数
2. 更新阶段
父组件的 beforeUpdate 钩子函数
子组件的 beforeUpdate 钩子函数
子组件的 updated 钩子函数
父组件的 updated 钩子函数
3. 销毁阶段
父组件的 beforeDestroy 钩子函数
子组件的 beforeDestroy 钩子函数
子组件的 destroyed 钩子函数
父组件的 destroyed 钩子函数
从上面的顺序可以看出:

渲染阶段: 先执行父组件的创建钩子函数,再执行子组件的创建钩子函数,最后执行子组件的挂载钩子函数和父组件的挂载钩子函数。
更新阶段: 先执行父组件的更新钩子函数,再执行子组件的更新钩子函数。
销毁阶段: 先执行父组件的销毁钩子函数,再执行子组件的销毁钩子函数。
这个执行顺序是有道理的,因为在渲染阶段,父组件需要先被创建,然后才能创建子组件。在销毁阶段,则需要先销毁子组件,再销毁父组件。
理解父子组件生命周期钩子函数的执行顺序非常重要,因为它可以帮助你更好地管理组件的状态和行为。比如,如果你需要在父组件挂载后获取数据并传递给子组件,
那么你就需要在父组件的 mounted 钩子函数中进行这个操作。

总之,掌握 Vue 2 中父子组件生命周期钩子函数的执行顺序,可以让你更好地控制组件的生命周期,编写出更加健壮和可维护的Vue应用程序。
*/

/***
 *
 * 在 Vue 3 中,父组件和子组件生命周期钩子函数的执行顺序与 Vue 2 相比没有太大变化。下面是 Vue 3 中父子组件生命周期钩子函数的执行顺序总结:

1. 渲染阶段

父组件的 beforeCreate 钩子函数(Vue 3 已废弃)
父组件的 created 钩子函数(Vue 3 已废弃)
父组件的 beforeMount 钩子函数(Vue 3 重命名为 beforeSetup)
父组件的 setup 钩子函数(Vue 3 新增)
子组件的 beforeCreate 钩子函数(Vue 3 已废弃)
子组件的 created 钩子函数(Vue 3 已废弃)
子组件的 beforeMount 钩子函数(Vue 3 重命名为 beforeSetup)
子组件的 setup 钩子函数(Vue 3 新增)
子组件的 mounted 钩子函数
父组件的 mounted 钩子函数
2. 更新阶段

父组件的 beforeUpdate 钩子函数
子组件的 beforeUpdate 钩子函数
子组件的 updated 钩子函数
父组件的 updated 钩子函数
3. 卸载阶段

父组件的 beforeUnmount 钩子函数(Vue 3 重命名)
子组件的 beforeUnmount 钩子函数(Vue 3 重命名)
子组件的 unmounted 钩子函数(Vue 3 新增)
父组件的 unmounted 钩子函数(Vue 3 新增)
从上面的顺序可以看出:

渲染阶段:Vue 3 引入了全新的 setup 钩子函数,它会在 beforeMount 钩子函数之后、渲染函数之前执行,并且在父子组件之间的执行顺序也保持不变。
新增的 setup 钩子函数用于替代 beforeCreate 和 created 钩子函数。
更新阶段:与 Vue 2 保持一致。
卸载阶段:beforeDestroy 钩子函数被重命名为 beforeUnmount,新增了 unmounted 钩子函数在组件卸载后执行。
总的来说,Vue 3 在生命周期钩子函数的执行顺序上与 Vue 2 保持了很大的一致性,只是进行了部分钩子函数的重命名和新增。掌握 Vue 3
中父子组件生命周期钩子函数的执行顺序,可以帮助你更好地管理组件的状态和行为,编写出更加健壮和可维护的 Vue 应用程序。
*/
</script>
