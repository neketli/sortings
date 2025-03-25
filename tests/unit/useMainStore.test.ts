import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMainStore } from '@/store/main';
import { createArray, randomIntFromInterval } from '@/utils';
import { ArrayItem } from '@/types';

vi.mock('@/utils', () => ({
  createArray: vi.fn((length) =>
    Array.from({ length }, (_, i) => ({ id: `id-${i}`, value: i + 1 }))
  ),
  randomIntFromInterval: vi.fn(() => 42),
}));

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mocked-uuid'),
}));

describe('useMainStore', () => {
  let store: ReturnType<typeof useMainStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useMainStore();
  });

  it('initializes with correct default state', () => {
    expect(store.array).toEqual([]);
    expect(store.length).toBe(10);
    expect(store.speed).toBe(1);
  });

  it('setArray updates the array', () => {
    const newArray: ArrayItem[] = [
      { id: '1', value: 10 },
      { id: '2', value: 20 },
    ];
    store.setArray(newArray);
    expect(store.array).toEqual(newArray);
  });

  it('setupArray creates an array of specified length', () => {
    store.setupArray();
    expect(createArray).toHaveBeenCalledWith(10);
    expect(store.array).toEqual([
      { id: 'id-0', value: 1 },
      { id: 'id-1', value: 2 },
      { id: 'id-2', value: 3 },
      { id: 'id-3', value: 4 },
      { id: 'id-4', value: 5 },
      { id: 'id-5', value: 6 },
      { id: 'id-6', value: 7 },
      { id: 'id-7', value: 8 },
      { id: 'id-8', value: 9 },
      { id: 'id-9', value: 10 },
    ]);
  });

  it('setupLength increases array length correctly', () => {
    store.setupArray(); 
    store.setupLength(12);
    expect(store.length).toBe(12);
    expect(store.array.length).toBe(12);
    expect(randomIntFromInterval).toHaveBeenCalledTimes(2);
    expect(store.array[10]).toEqual({ id: 'mocked-uuid', value: 42 });
    expect(store.array[11]).toEqual({ id: 'mocked-uuid', value: 42 });
  });

  it('setupLength decreases array length correctly', () => {
    store.setupArray(); 
    store.setupLength(8); 
    expect(store.length).toBe(8);
    expect(store.array.length).toBe(8);
    expect(store.array).toEqual([
      { id: 'id-0', value: 1 },
      { id: 'id-1', value: 2 },
      { id: 'id-2', value: 3 },
      { id: 'id-3', value: 4 },
      { id: 'id-4', value: 5 },
      { id: 'id-5', value: 6 },
      { id: 'id-6', value: 7 },
      { id: 'id-7', value: 8 },
    ]);
  });
});