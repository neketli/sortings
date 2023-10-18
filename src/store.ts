import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    debug: import.meta.env.MODE === "development",
    isInitialized: false,
  }),

  actions: {
    initApp() {
      this.isInitialized = true;
      console.log("app initialized!");
    },
  },

  getters: {
    isReady: (state) => {
      return !state.isInitialized;
    },
  },
});
