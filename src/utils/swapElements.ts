import { ArrayItem } from "@/types";

/**
 * Функция для перестановки местами двух элементов массива
 */
export const swapElements = (
  items: ArrayItem[],
  firstIndex: number,
  secondIndex: number
) => {
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
};
