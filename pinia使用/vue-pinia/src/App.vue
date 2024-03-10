<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useCounterStore, userNameStore } from '@/stores/counter.js'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
console.log(store)
store.increment()
//
const users = userNameStore()
const { name, age, items, count } = storeToRefs(users)
// users.increment()
// users.randomizeCounter()
const { increment, randomizeCounter } = users
increment()
users.$subscribe((mutation, state) => {
  console.log(state, 'state')
  console.log(mutation, 'mutation')
})
</script>

<template>
  <button @click="randomizeCounter()">调用</button>
  <h1>{{ store.count }}哈哈哈哈</h1>
  <h1>{{ store.doubleCount }}哈哈哈哈</h1>
  <h1>{{ name }}</h1>
  <h1>{{ age }}age</h1>
  <h1>{{ items }}item</h1>
  <h1>{{ count }}count</h1>
  <h1>{{ form }}doubleCount</h1>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
