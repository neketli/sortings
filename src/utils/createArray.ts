const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createArray = (arrayLength: number) => {
  const array = new Array(arrayLength).fill(0);

  return array.map((_, idx) => ({
    id: idx,
    value: randomIntFromInterval(40, 500),
  }));
};
