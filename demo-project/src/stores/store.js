import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    myStr: "",
    elements: [
    ],
  }),
  getters: {
    totalPeople: (state) => state.elements.length,
  },
  actions: {
    addPerson(val) {
      this.elements.push({ name: val });
      this.myStr = ""
    },
  },
});
