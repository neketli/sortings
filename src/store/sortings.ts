import { defineStore } from "pinia";
import { ArrayItem } from "@/types";
import { useMainStore } from "@/store/main";

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

    async successSorting(arr: number[]) {
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

      this.successSorting(this.sortedElements);
    },

    async quickSort(array: ArrayItem[], length: number) {
      const { setArray } = useMainStore();

      // вспомогательная функция для свапа элементов
      const swap = (
        items: ArrayItem[],
        firstIndex: number,
        secondIndex: number
      ) => {
        const temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;

        setArray(items);
      };

      // функция разделения массива
      const partition = async (
        items: ArrayItem[],
        left: number,
        right: number,
        pivot: ArrayItem
      ) => {
        // указатели на левый и правый конец массива
        let i = left;
        let j = right;

        while (i <= j) {
          // слева-направо
          // если элемент в левой части меньше опорного, то пропускаем его и сдвигаем указатель
          while (items[i].value < pivot.value) {
            i++;
          }

          // справа-налево
          // если элемент в правой части больше опорного, то пропускаем его и сдвигаем указатель
          while (items[j].value > pivot.value) {
            j--;
          }

          // меняем местами элементы, если условие выполняется
          if (i <= j) {
            // выделяем индексы элементов в качестве активных
            this.activeElements = [items[i].id, items[j].id];

            this.setPause();
            await this.pause;
            swap(items, i, j);
            this.setPause();
            await this.pause;

            i++;
            j--;
          }
        }

        // возвращаем индекс, по которому массив разделяется на два подмассива
        return i;
      };

      // рекурсивная функция быстрой сортировки
      const quickSort = async (
        items: ArrayItem[],
        left: number,
        right: number
      ) => {
        // берём средний элемент массива как опорный
        const pivotIndex = Math.floor((right + left) / 2);
        const pivot = items[pivotIndex];

        // выделяем опорный элемент дополнительным цветом
        this.additionalElements = [pivot.id];

        // индекс, по которому массив разделяется на два подмассива
        const index = await partition(items, left, right, pivot);

        // рекурсивно запускаем процедуру для левой части
        if (left < index - 1) {
          await quickSort(items, left, index - 1);
        }

        // рекурсивно запускаем процедуру для правой части
        if (index < right) {
          await quickSort(items, index, right);
        }

        return items;
      };

      this.startSorting();
      await quickSort(array, 0, length - 1);
      this.successSorting([...array.map(({ id }) => id)]);
    },
  },

  getters: {},
});
