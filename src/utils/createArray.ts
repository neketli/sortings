import { v4 as uuidv4 } from "uuid";
import { randomIntFromInterval } from "./random";

export const createArray = (arrayLength: number) => {
  const array = new Array(arrayLength).fill(0);

  return array.map((_) => ({
    id: uuidv4(),
    value: randomIntFromInterval(40, 500),
  }));
};
