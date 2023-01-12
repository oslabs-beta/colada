// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  getters: {
    totalCount: (state) => state.elements.length,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
