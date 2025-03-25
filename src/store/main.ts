import { defineStore } from "pinia";
import { createArray, randomIntFromInterval } from "@/utils";
import { ArrayItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

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
      const count = length - this.array.length;
      for (let index = 0; index < Math.abs(count); index++) {
        if (count > 0) {
          this.array.push({
            id: uuidv4(),
            value: randomIntFromInterval(40, 500),
          });
        } else {
          this.array.pop();
        }
      }
    },
  },

  getters: {},
});
