<template>
  <p>{{ counter }}</p>
  <p>{{ doubleCounter }}</p>
  <p>{{ msg2 }}</p>
  <p ref="desc"></p>
  <Composition></Composition>
  <ModalButton></ModalButton>
  <Emits @click="onClick"></Emits>
  <!-- 实例方法定义组件 -->
  <comp></comp>
  <!-- 数据双向绑定 -->
  <Vmodel :modelValue="data" @update:modelValue="data = $event"></Vmodel>
  <Vmodel v-model="data"></Vmodel>
  <Vmodel v-model:modelValue="data"></Vmodel>
  <!-- render api 变化 -->
  <RenderTest v-model:counter="counter">
    <template v-slot:default>xxx------</template>
    <template v-slot:content>xxx1111</template>
  </RenderTest>
  <!-- 函数式组件 -->
  <Functional level="3">这是一个动态h元素</Functional>
  <!-- 异步函数式组件  -->
  <AsyncComp></AsyncComp>
  <!-- 自定义指令 -->
  <p v-highlight="'green'">我的颜色</p>
  <!-- 过渡动画 -->
  <TransitionTest></TransitionTest>
  <!-- 编程方式发送和监听事件 -->
  <button @click="sendMsg">emit event</button>
  <!--  -->
  <Todo></Todo>
</template>

<script>
import {
  reactive,
  computed,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
  h,
  defineAsyncComponent,
} from "vue";

import Composition from "./Composition.vue";
import ModalButton from "./ModeButton.vue";
import Emits from "./Emits.vue";
import Vmodel from "./Vmodel.vue";
import Functional from "./Functional.vue";
import TransitionTest from "./TransitionTest.vue";
import Todo from "./todos/Todos.vue";
// 事件的派发和监听
import mitt from "mitt";
export const emitter = mitt();

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      data: "张泽雨",
      counter: 0,
    };
  },
  components: {
    Composition,
    ModalButton,
    Emits,
    Vmodel,
    RenderTest: {
      props: {
        counter: {
          type: Number,
          default: 0,
        },
      },
      render() {
        // const emit = this.$emit;
        // const counter = this.counter;
        // console.log(this.$slots.default());
        // console.log(this.$slots.content());
        return h("div", [
          h(
            "div",
            {
              onClick: this.onClick,
            },
            `I am RenderTest ${this.counter}`,
            this.$slots.default(),
            this.$slots.content()
          ),
        ]);
      },
      methods: {
        onClick() {
          this.$emit("update:counter", this.counter + 1);
        },
      },
    },
    Functional,
    AsyncComp: defineAsyncComponent(() => import("./NextPage.vue")),
    TransitionTest,
    Todo,
  },
  setup(props, context) {
    // console.log(props);
    // console.log(context);
    // console.log(this);
    // counter 相关
    const { counter, doubleCounter } = useCounter();
    // 单值响应式
    const msg2 = ref("some message");
    // 使用元素引用
    const desc = ref(null);
    // 监听
    watch(counter, (val, oldVal) => {
      const p = desc.value;
      p.textContent = `${oldVal}--- ${val}`;
    });
    return { counter, doubleCounter, msg2, desc };
  },
  methods: {
    onClick() {
      console.log("click me");
    },
    sendMsg() {
      emitter.emit("someEvent", "foooo");
    },
  },
};
function useCounter() {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2),
  });
  let timer;

  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(timer);
  });
  return toRefs(data);
}
</script>
