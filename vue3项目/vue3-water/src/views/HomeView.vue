<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-04 19:20:38
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-11 11:06:53
 * @FilePath: \vue3-warter\src\views\HomeView.vue
-->

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MyCompent from "@/components/MyCompent.vue";
import Add from "./Add.vue";

const count = ref(0);
const name1 = ref("mike");

const people1 = ref({
  name: "mike",
  age: 16,
  address: "china"
});

const people2 = reactive({
  name: "mike",
  age: 16,
  address: "china"
});

const state = reactive({ count1: 0 });

// 当解构时，count 已经与 state.count 断开连接
let { count1 } = state;
// 不会影响原始的 state
count1++;
console.log("count1", count1);
console.log("d", state.count1);

onMounted(() => {
  count.value = 20;
});
const changeName = () => {
  name1.value = "tom";
};

setTimeout(() => {
  name1.value = "to问问m";
  people2.name = "tom232";
  people2.age = 12;
  people2.address = "tom23洒水是2";
  people1.value.age = 20;
}, 2000);

watch(
  people1,
  () => {
    console.log("people1");
  },
  { deep: true }
);

watch(people2, (newVal, oldVal) => {
  console.log("people2", newVal, oldVal);
});

watch(name1, () => {
  console.log("name1");
});
const title = ref();

const callBack = (data) => {
  console.log("打印", data);
};
const goBack = (data) => {
  console.log("dayin ", data);
};
</script>

<template>
  <div @click="() => count++">点击 {{ count }}</div>
  <HelloWorld :title="title"></HelloWorld>
  <button @click="changeName">改变</button>
  {{ name }}
  <h1>{{ people2.name }}</h1>
  <h1>{{ people2.age }}</h1>
  <h1>{{ people2.address }}</h1>
  <h1>{{ people1.age }}</h1>
  <MyCompent :title="'hello'"></MyCompent>
  <div>我是中国{{ state.count1 }}</div>
  <Add @back="callBack" @go="goBack"></Add>
  <n-space>
    <n-button>Default</n-button>
    <n-button type="tertiary"> Tertiary </n-button>
    <n-button type="primary"> Primary </n-button>
    <n-button type="info"> Info </n-button>
    <n-button type="success"> Success </n-button>
    <n-button type="warning"> Warning </n-button>
    <n-button type="error"> Error </n-button>
  </n-space>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox v-model:checked="value"> 复选框 </n-checkbox>
    <n-checkbox v-model:checked="value" />
    <n-checkbox v-model:checked="value" :disabled="disabled">
      复选框
    </n-checkbox>
    <n-button size="small" @click="disabled = !disabled"> 禁用 </n-button>
  </n-space>
  <n-space vertical>
    <n-space>
      <n-space>
        <n-switch v-model:value="checkStrategyIsChild" />Child Check Strategy
      </n-space>
      <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
      <n-space><n-switch v-model:value="hoverTrigger" />Hover Trigger</n-space>
      <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
    </n-space>
    <n-cascader />
  </n-space>
</template>
