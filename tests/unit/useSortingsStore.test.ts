import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useSortingsStore } from "@/store/sortings";
import { ArrayItem } from "@/types";

let array: ArrayItem[] = [];
vi.mock("@/store/main", () => ({
  useMainStore: vi.fn(() => ({
    setArray: vi.fn((arr) => {
      array = [...arr];
    }),
    speed: 1,
  })),
}));

describe("useSortingsStore", () => {
  let store: ReturnType<typeof useSortingsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useSortingsStore();
    array = [];
    vi.useFakeTimers();

    vi.spyOn(store, "setPause").mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with correct default state", () => {
    expect(store.isPaused).toBe(false);
    expect(store.isActive).toBe(false);
    expect(store.isSuccess).toBe(false);
    expect(store.pause).toBe(null);
    expect(store.activeElements).toEqual([]);
    expect(store.sortedElements).toEqual([]);
    expect(store.additionalElements).toEqual([]);
  });

  it("startSorting resets state and sets isActive", () => {
    store.isPaused = true;
    store.activeElements = ["1"];
    store.startSorting();
    expect(store.isPaused).toBe(false);
    expect(store.isActive).toBe(true);
    expect(store.activeElements).toEqual([]);
  });

  it("stopSorting resets state after pause", async () => {
    store.isActive = true;
    store.setPause(100);
    const stopPromise = store.stopSorting();
    vi.advanceTimersByTime(100);
    await stopPromise;
    expect(store.isActive).toBe(false);
    expect(store.pause).toBe(null);
  });

  it.each([
    "bubbleSort",
    "gnomeSort",
    "shakerSort",
    "quickSort",
    "mergeSort",
    "selectionSort",
    "insertionSort",
    "radixSort",
  ])("%s algorithm sorts array correctly", async (methodName: string) => {
    const arr: ArrayItem[] = [
      { id: "1", value: 3 },
      { id: "2", value: 1 },
      { id: "3", value: 2 },
    ];
    await (store as any)[methodName](arr);

    expect(store.isSuccess).toBe(true);
    expect(array).toEqual(arr.sort((prev, next) => prev.value - next.value));
  });
});
