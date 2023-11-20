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
    /**
     * Инициализация промиса *pause* для восприятия анимации
     * @param ms время ожидания в мс
     */
    setPause(ms = 100) {
      const { speed } = useMainStore();
      this.pause = new Promise<void>((resolve) =>
        setTimeout(resolve, ms / speed)
      );
    },
    /**
     * Внутренний метод для отслеживания старта сортировки
     */
    startSorting() {
      this.$reset();
      this.isActive = true;
    },
    /**
     * Внутренний метод для отслеживания остановки
     */
    async stopSorting() {
      if (this.pause) await this.pause;
      this.$reset();
    },
    /**
     * Внутренний метод для анимации успешной сортировки
     */
    async successSorting(arr: number[]) {
      await this.stopSorting();

      for (let index = 0; index < arr.length; index++) {
        this.sortedElements.push(arr[index]);
        this.setPause(100);
        await this.pause;
      }
    },
    /**
     * Сортировка пузырьком
     */
    async bubbleSort(array: ArrayItem[]) {
      const { setArray } = useMainStore();
      this.startSorting();

      for (let step = 0; step < array.length - 1; step++) {
        const lastIndex = array.length - 1 - step;
        for (let compareIndex = 0; compareIndex < lastIndex; compareIndex++) {
          // Проверка состояния
          this.setPause();
          await this.pause;
          if (!this.isActive) return;

          const left = array[compareIndex];
          const right = array[compareIndex + 1];

          // выделяем индексы сравниваемых элементов
          this.activeElements = [left.id, right.id];
          if (left.value > right.value) {
            array[compareIndex] = right;
            array[compareIndex + 1] = left;
            setArray(array);

            // задержка для восприятия анимации
            this.setPause();
            await this.pause;
          }
        }
        // после сравнений очищаем убираем активные, и добавляем элемент в список отсортированных
        this.activeElements = [];
        this.sortedElements.push(array[lastIndex].id);
      }
      this.sortedElements.push(array[0].id);

      if (this.isActive) this.successSorting(this.sortedElements);
    },
    /**
     * Быстрая сортировка
     */
    async quickSort(array: ArrayItem[]) {
      const { setArray } = useMainStore();
      /**
       * Функция для перестановки местами двух элементов массива
       */
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

      /**
       * Функция для разделения массива
       */
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

      const quickSort = async (
        items: ArrayItem[],
        leftIndex: number,
        rightIndex: number
      ) => {
        // Проверка состояния
        if (!this.isActive) return;

        // берём средний элемент массива как опорный
        const pivotIndex = Math.floor((leftIndex + rightIndex) / 2);
        const pivot = items[pivotIndex];

        // выделяем опорный элемент дополнительным цветом
        this.additionalElements = [pivot.id];

        // индекс, по которому массив разделяется на два подмассива
        const index = await partition(items, leftIndex, rightIndex, pivot);

        // рекурсивно запускаем процедуру для левой части
        if (leftIndex < index - 1) {
          await quickSort(items, leftIndex, index - 1);
        }

        // рекурсивно запускаем процедуру для правой части
        if (index < rightIndex) {
          await quickSort(items, index, rightIndex);
        }

        return items;
      };

      this.startSorting();
      await quickSort(array, 0, array.length - 1);
      if (this.isActive) this.successSorting([...array.map(({ id }) => id)]);
    },
  },

  getters: {},
});
