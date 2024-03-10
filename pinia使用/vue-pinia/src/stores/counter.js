import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(20)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})

export const userNameStore = defineStore('user', {
  state: () => ({
    name: '张泽雨',
    age: 32,
    items: ['rer', 'iifufu'],
    count: 10,
    doubleCount: 0
  }),
  actions: {
    increment() {
      this.age--
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})

export const formStore = defineStore('form', () => {
  const form = '表格数据'
  return { form }
})
