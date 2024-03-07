/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-04-18 11:16:26
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-11 15:16:50
 * @FilePath: \vue\src\utils\create.js
 */
// Component - 组件配置对象
// props - 传递给它的属性
import Vue from "vue";
// function create(Component, props) {
//   //1. 构建Component 实例
//   const vm = new Vue({
//     render(h) {
//       // h是createElement
//       // 它可以返回一个vnode
//       return h(Component, { props });
//     }
//   }).$mount(); // 不设置挂载目标,依然可以转换vndoe为真实节点

//   // 2. 挂载到body上
//   document.body.appendChild(vm.$el);

//   //3. 获取组件的实例
//   const comp = vm.$children[0];
//   comp.remove = () => {
//     document.body.removeChild(vm.$el);
//     vm.$destroy();
//   };
//   return comp;
// }

// export default create;

function create(Component, props) {
  // 组件构造函数如何获取
  //1.Vue.extend()
  const Ctor = Vue.extend(Component);
  // 创建组件实例
  const comp = new Ctor({ propsData: props });
  console.log(comp);
  comp.$mount();
  document.body.appendChild(comp.$el);

  comp.remove = function() {
    document.body.removeChild(comp.$el);
    comp.$destroy();
  };

  return comp;
}
export default create;
