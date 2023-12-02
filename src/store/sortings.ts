/* eslint-disable id-length */
import { defineStore } from "pinia";
import { ArrayItem } from "@/types";
import { useMainStore } from "@/store/main";
import { swapElements } from "@/utils";

export const useSortingsStore = defineStore("soritngs", {
  state: () => ({
    isPaused: false,
    isActive: false,
    isSuccess: false,
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

      return this.pause;
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

      this.isSuccess = true;
      for (let index = 0; index < arr.length; index++) {
        this.sortedElements.push(arr[index]);
        await this.setPause(100);
        if (!this.isSuccess) return;
      }
    },
    /**
     * Сортировка пузырьком
     */
    async bubbleSort(array: ArrayItem[]) {
      const { setArray } = useMainStore();
      this.startSorting();

      for (let index = 0; index < array.length - 1; index++) {
        const lastIndex = array.length - 1 - index;
        for (let compareIndex = 0; compareIndex < lastIndex; compareIndex++) {
          // Проверка состояния
          await this.setPause();
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
            await this.setPause();
          }
        }
        // после сравнений очищаем убираем активные, и добавляем элемент в список отсортированных
        this.activeElements = [];
        this.sortedElements.push(array[lastIndex].id);
      }
      this.sortedElements.push(array[0].id);

      if (this.isActive)
        this.successSorting([...this.sortedElements].reverse());
    },
    /**
     * Быстрая сортировка
     */
    async quickSort(array: ArrayItem[]) {
      const { setArray } = useMainStore();

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

            await this.setPause();

            swapElements(items, i, j);
            setArray(items);

            await this.setPause();

            i++;
            j--;
          }
        }

        // возвращаем индекс, по которому массив разделяется на два подмассива
        return i;
      };

      const sort = async (
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
          await sort(items, leftIndex, index - 1);
        }

        // рекурсивно запускаем процедуру для правой части
        if (index < rightIndex) {
          await sort(items, index, rightIndex);
        }

        return items;
      };

      this.startSorting();
      await sort(array, 0, array.length - 1);
      if (this.isActive) this.successSorting([...array.map(({ id }) => id)]);
    },
    /**
     * Сортировка слиянием
     * (Вариация с сортировкой "на месте", без выделения доп. памяти)
     */
    async mergeSort(array: ArrayItem[]) {
      const { setArray } = useMainStore();

      const merge = async (
        items: ArrayItem[],
        start: number,
        mid: number,
        end: number,
        curr = mid + 1
      ) => {
        if (!this.isActive) return false;

        if (items[mid].value <= items[curr].value) {
          this.activeElements = [items[mid].id, items[curr].id];
          return;
        }

        // Два указателя для поддержания начала  обоих массивов для слияния
        while (this.isActive && start <= mid && curr <= end) {
          this.activeElements = [items[start].id, items[curr].id];

          // Пропускаем элементы которые стоят на своём месте
          if (items[start].value <= items[curr].value) {
            start++;
            continue;
          }

          const value = items[curr];

          // Смещаем все элементы между curr и start
          for (let index = curr; index > start; index--) {
            items[index] = items[index - 1];
          }

          items[start] = value;

          await this.setPause();
          setArray(items);

          start++;
          mid++;
          curr++;
        }
        if (!this.isActive) return false;
      };

      const sort = async (items: ArrayItem[], left: number, right: number) => {
        if (!this.isActive) return;
        if (left < right) {
          const mid = Math.floor((left + right) / 2);
          // Сортируем левую часть
          await sort(items, left, mid);
          // Сортируем правую часть
          await sort(items, mid + 1, right);

          // Делаем слияние изменений
          if (!(await merge(items, left, mid, right))) {
            return;
          }
        }
      };

      this.startSorting();
      const arr = [...array];
      await sort(arr, 0, arr.length - 1);
      if (this.isActive) this.successSorting([...arr.map(({ id }) => id)]);
    },
    /**
     * Сортировка выбором
     */
    async selectionSort(array: ArrayItem[]) {
      const { setArray } = useMainStore();
      this.startSorting();

      for (let index = 0; index < array.length; index++) {
        if (!this.isActive) return false;
        let minElement = array[index];
        let minIndex = index;

        for (
          let compareIndex = index;
          compareIndex < array.length;
          compareIndex++
        ) {
          if (!this.isActive) return false;

          this.activeElements = [array[minIndex].id, array[compareIndex].id];

          const activeElement = array[compareIndex];

          if (activeElement.value < minElement.value) {
            minElement = activeElement;
            minIndex = compareIndex;
          }

          await this.setPause(100);
        }

        const temp = array[index];
        array[index] = minElement;
        array[minIndex] = temp;

        setArray(array);

        await this.setPause();

        this.sortedElements.push(minElement.id);
      }

      if (this.isActive) this.successSorting([...array.map(({ id }) => id)]);
    },
  },
});
