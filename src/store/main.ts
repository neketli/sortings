import { defineStore } from "pinia";
import { createArray } from "@/utils";
import { ArrayItem } from "@/types";

export const useMainStore = defineStore("main", {
  state: () => ({
    array: [] as ArrayItem[],
    length: 10,
    speed: 1,
  }),

  actions: {
    /**
     * Задание массива
     */
    setArray(newArray: ArrayItem[]) {
      this.array = [...newArray];
      //   this.array.map((_, idx) => newArray[idx]);
    },
    /**
     * Инициализация базового массива
     */
    setupArray() {
      this.array = createArray(this.length);
    },
    /**
     * Задание длинны и инициализация массива соотв. длинны
     */
    setupLength(length: number) {
      this.length = length;
      this.setupArray();
    },
  },

  getters: {},
});
