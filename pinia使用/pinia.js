/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-14 18:28:14
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-14 18:34:09
 * @FilePath: \my-study\pinia使用\pinia.js
 */
// 首先,我们定义一个 defineStore 函数,用于创建 Store 实例:
import { reactive, computed } from "vue";

const stores = {}; // 存储所有 Store 实例

export function defineStore(id, options) {
  if (stores[id]) {
    return stores[id];
  }

  const state = reactive(options.state ? options.state() : {});
  const getters = {};
  const actions = {};

  Object.keys(options.getters || {}).forEach((name) => {
    getters[name] = computed(() => options.getters[name](state));
  });

  Object.keys(options.actions || {}).forEach((name) => {
    actions[name] = options.actions[name].bind({ state });
  });

  const store = {
    id,
    state,
    getters,
    actions,
  };

  stores[id] = store;
  return store;
}
/*
    在这个函数中,我们首先检查 Store 是否已经存在。如果不存在,则创建一个新的 Store 实例。
    state 使用 Vue 3 的 reactive 函数创建,确保它是响应式的。
    getters 使用 computed 函数包装,每个 getter 都是一个计算属性,依赖于 state。
    actions 是普通的函数,通过 bind 绑定到 state 上,使它们可以直接访问 state。
    最后,我们将 Store 实例存储在一个全局对象 stores 中,并返回这个实例。
*/
import { ref } from "vue";
import { defineStore } from "./store";

//要在组件中使用 Store,我们可以定义一个简单的 useStore 函数:
export function useStore(id) {
  const store = ref(stores[id]);
  return store;
}
/*
这个函数从 stores 对象中获取对应的 Store 实例,并将其包装在一个 ref 中,
以确保在组件中可以正确地响应 Store 的变化。
在组件中,我们可以这样使用 Store:
*/
import { useStore } from "./store";

export default {
  setup() {
    const counterStore = useStore("counter");

    return {
      counterStore,
    };
  },
};

/**
 * 3. 响应式更新
当我们修改 Store 的 state 时,Vue 3 的响应式系统会自动检测到变化,并触发相应的更新。例如:
 * 
 * 
*/
const counterStore = useStore("counter");
counterStore.value.state.count++; // 修改 state
console.log(counterStore.value.getters.doubleCount); // 获取 getter 的计算结果

/**
 * 4. 优化和扩展
  上面的示例是一个非常简化的版本,实际的 Pinia 源码还包括了许多其他功能和优化,例如:
  插件系统: 支持通过插件扩展 Pinia 的功能。
  命名空间: 支持命名空间,方便管理和组织多个 Store。
  持久化: 支持将 Store 的状态持久化到浏览器存储中。
  devtools 集成: 集成 Vue 的 devtools 扩展,提供更好的调试体验。
  TypeScript 支持: 提供更好的类型推导和类型检查支持。
  性能优化: 利用 Vue 3 的新特性,如 markRaw 和 shallowReactive,来优化性能。
  总的来说,Pinia 的源码实现利用了 Vue 3 提供的响应式数据系统和依赖注入系统,提供了一种简单、
  高效的状态管理解决方案。通过研究 Pinia 的源码,我们可以更好地理解 Vue 3 的新特性,
  以及如何利用这些特性来构建更加优秀的应用程序。
 * 
 * 
*/
