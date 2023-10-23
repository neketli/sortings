import { defineStore } from "pinia";
import { ArrayItem } from "@/types";
import { useMainStore } from "./main";

export const useSortingsStore = defineStore("soritngs", {
  state: () => ({
    isActive: false,
    sortingSpeed: 1,
    activeElements: [] as number[],
    sortedElements: [] as number[],
    additionalElements: [] as number[],
  }),

  actions: {
    $reset() {
      this.isActive = false;
      this.sortingSpeed = 1;
      this.activeElements = [];
      this.sortedElements = [];
      this.additionalElements = [];
    },
    async setPause(ms = 100) {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, ms / this.sortingSpeed)
      );
    },
    startSorting() {
      this.$reset();
      this.isActive = true;
    },

    async afterSuccessSorting() {
      const { length } = useMainStore();
      this.$reset();

      for (let index = 0; index < length; index++) {
        this.sortedElements[index] = index;
        await this.setPause(1);
      }
    },

    async bubbleSort(array: ArrayItem[], length: number) {
      const mainStore = useMainStore();
      this.startSorting();

      for (let step = 0; step < length - 1; step++) {
        for (
          let compareIndex = 0;
          compareIndex < length - 1 - step;
          compareIndex++
        ) {
          // добавляем задержку для восприятия анимации
          await this.setPause();

          const left = array[compareIndex];
          const right = array[compareIndex + 1];

          // в качестве активных выделяем индексы элементов,
          // которые сравниваются между собой в данный момент
          this.activeElements = [left.id, right.id];

          if (left.value > right.value) {
            array[compareIndex] = right;
            array[compareIndex + 1] = left;

            // изменяем состояние массива в хранилище путём перестановки элементов
            mainStore.setArray(array);

            // добавляем задержку для восприятия анимации
            await this.setPause();
          }
        }

        // в конце цикла сравнений добавляем новый элемент в список
        this.sortedElements.push(length - 1 - step);
      }

      this.afterSuccessSorting();
    },
  },

  getters: {},
});
