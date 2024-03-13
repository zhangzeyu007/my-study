/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-13 20:30:18
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-13 20:30:28
 * @FilePath: \my-study\vue混入\02.js
 */
/**
 * Vue 2 中的混入 (mixin) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。
 * 当组件使用了混入对象时,混入对象的钩子函数将被注入到组件的生命周期钩子中,
 * 并与组件自身的生命周期钩子函数进行合并。

混入对象的生命周期钩子函数与组件自身的生命周期钩子函数的执行顺序如下:

混入对象的生命周期钩子函数先执行
当组件使用了多个混入对象时,混入对象的生命周期钩子函数按照在 mixins 数组中定义的顺序执行。

组件自身的生命周期钩子函数后执行
组件自身的生命周期钩子函数在混入对象的生命周期钩子函数执行完之后执行。

钩子函数的执行顺序
生命周期钩子函数的执行顺序如下:

created 钩子函数

混入对象 A 的 created 钩子函数
混入对象 B 的 created 钩子函数
组件自身的 created 钩子函数
mounted 钩子函数

混入对象 A 的 mounted 钩子函数
混入对象 B 的 mounted 钩子函数
组件自身的 mounted 钩子函数
updated 钩子函数

混入对象 A 的 updated 钩子函数
混入对象 B 的 updated 钩子函数
组件自身的 updated 钩子函数
其他生命周期钩子函数
遵循同样的执行顺序
 * 
 * 
 * 
 * 
*/
const mixin1 = {
  created() {
    console.log("mixin1 created");
  },
  mounted() {
    console.log("mixin1 mounted");
  },
};

const mixin2 = {
  created() {
    console.log("mixin2 created");
  },
  mounted() {
    console.log("mixin2 mounted");
  },
};

const MyComponent = {
  mixins: [mixin1, mixin2],
  created() {
    console.log("MyComponent created");
  },
  mounted() {
    console.log("MyComponent mounted");
  },
};

// 输出顺序:
// mixin1 created
// mixin2 created
// MyComponent created
// mixin1 mounted
// mixin2 mounted
// MyComponent mounted
