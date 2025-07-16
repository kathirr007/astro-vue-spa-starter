<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from './stores/counter'
// const counterStore = useCounterStore();
const { count, name, doubleCount } = storeToRefs(useCounterStore())
const { increment, decrement } = useCounterStore()

useHead({
  title: 'Home',
  titleTemplate: '%s | Astro vue app',
})
</script>

<template>
  <nav>
    <a href="/">Home static</a><br>
    <RouterLink to="/">
      SPA home
    </RouterLink><br>
    <RouterLink to="/about">
      SPA about
    </RouterLink> <br>
    <RouterLink to="/blog">
      SPA blog page
    </RouterLink> <br>
    <RouterLink to="/test">
      Test page
    </RouterLink> <br>
    <RouterLink to="/contact">
      Contact page
    </RouterLink>
  </nav>
  <div>
    <button @click="increment">
      Inc+
    </button>
    <button @click="decrement">
      Dec-
    </button>
    <br>
    Counter: {{ count }}
    <br>
    Counter doubled: {{ doubleCount }}
    <br>
    Name from store: {{ name }}
  </div>
  <RouterView />
</template>
