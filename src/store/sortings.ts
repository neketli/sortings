import { defineStore } from "pinia";
import { ArrayItem } from "@/types";
import { useMainStore } from "./main";

export const useSortingsStore = defineStore("soritngs", {
  state: () => ({
    isPaused: false,
    isActive: false,
    pause: null as Promise<void> | null,
    activeElements: [] as number[],
    sortedElements: [] as number[],
    additionalElements: [] as number[],
  }),

  actions: {
    async setPause(ms = 100) {
      const { speed } = useMainStore();
      this.pause = new Promise<void>((resolve) =>
        setTimeout(resolve, ms / speed)
      );
    },
    startSorting() {
      this.$reset();
      this.isActive = true;
    },
    async stopSorting() {
      if (this.pause) await this.pause;
      this.$reset();
    },

    async afterSuccessSorting(arr: number[]) {
      await this.stopSorting();

      for (let index = 0; index < arr.length; index++) {
        this.sortedElements.push(arr[index]);
        this.setPause(100);
        await this.pause;
      }
    },

    async bubbleSort(array: ArrayItem[], length: number) {
      const { setArray } = useMainStore();
      this.startSorting();

      for (let step = 0; step < length - 1; step++) {
        const lastIndex = length - 1 - step;
        for (let compareIndex = 0; compareIndex < lastIndex; compareIndex++) {
          if (!this.isActive) return;
          // добавляем задержку для восприятия анимации
          this.setPause();
          await this.pause;
          if (!this.isActive) return;

          const left = array[compareIndex];
          const right = array[compareIndex + 1];

          // в качестве активных выделяем индексы элементов,
          // которые сравниваются между собой в данный момент
          this.activeElements = [left.id, right.id];

          if (left.value > right.value) {
            array[compareIndex] = right;
            array[compareIndex + 1] = left;

            // изменяем состояние массива в хранилище путём перестановки элементов
            setArray(array);

            // добавляем задержку для восприятия анимации
            this.setPause();
            await this.pause;
          }
        }
        this.activeElements = [];
        // в конце цикла сравнений добавляем новый элемент в список
        this.sortedElements.push(array[lastIndex].id);
      }
      this.sortedElements.push(array[0].id);

      this.afterSuccessSorting(this.sortedElements);
    },
  },

  getters: {},
});
