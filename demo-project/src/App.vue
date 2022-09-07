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
//window.store = {state}
</script>

<template>
  <div class="wrapper">
    <Header msg="You did it!" />
    You wrote: {{ store.myStr }}<br/>
    there are {{ store.totalPeople }} people.
  </div>
  
  <input v-model="store.myStr" @keydown.enter="store.addPerson(store.myStr)" />
  <main>
    <Main v-for="item in store.elements" :item="item" />
  </main>

  <Counter @btn-click = "counter.increment" :num="counter.count" />

  <DoubleStore @dbl-store-count="counter.increment" @dbl-store-text="store.addPerson(store.myStr)" :num="counter.count"/>

</template>
