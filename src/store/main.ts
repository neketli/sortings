import { defineStore } from "pinia";
import { createArray } from "../utils";
import { ArrayItem } from "@/types";

export const useMainStore = defineStore("main", {
  state: () => ({
    array: [] as ArrayItem[],
    length: 10,
  }),

  actions: {
    setArray(newArray: ArrayItem[]) {
      this.array = this.array.map((_, idx) => newArray[idx]);
    },
    setupArray() {
      this.array = createArray(this.length);
    },
    setupLength(length: number) {
      this.length = length;
      this.setupArray();
    },
  },

  getters: {},
});
