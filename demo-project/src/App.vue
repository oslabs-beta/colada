<script setup>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import { useStore } from "./stores/store.js";
import {useCounterStore} from './stores/counter.js'
import Counter from './components/Counter.vue';
import DoubleStore from './components/DoubleStore.vue';

const store = useStore();
const counter = useCounterStore();

//assign the store property in the store
window.store = {store, counter}
</script>

<template>
  <div class="wrapper">
    <Header msg="Colada Demo Project" />
    <div class="content-container">
      <div class="btn-container">
        <h1>Count: <span class="green">{{counter.count}}</span></h1>
        <Counter @btn-click = "counter.increment" :num="counter.count" />
        <DoubleStore @dbl-store-count="counter.increment" @dbl-store-text="store.addPerson(store.myStr)" :num="counter.count"/>
      </div>
      <div class="text-container">
        <h1>You wrote: <span class="green">{{ store.myStr }}</span></h1>
        <h2>there are <span class="yellow">{{ store.totalPeople }}</span> people.</h2>
        <input v-model="store.myStr" @keydown.enter="store.addPerson(store.myStr)" />
        <main>
          <Main v-for="item in store.elements" :item="item" />
        </main>
      </div>
    </div>
  </div>
</template>

