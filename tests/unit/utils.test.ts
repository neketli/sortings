import { describe, it, expect, vi, beforeEach } from "vitest";
import { randomIntFromInterval, createArray } from "@/utils";

const v4Mock = vi.fn(() => "mocked-uuid");
vi.mock("uuid", () => ({
  v4: vi.fn(() => v4Mock()),
}));

describe("randomIntFromInterval", () => {
  it("returns a number within the specified range", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const result = randomIntFromInterval(40, 500);
    // min=40, max=500, range=461 (500-40+1)
    // Math.floor(0.5 * 461 + 40) = Math.floor(230.5 + 40) = 270
    expect(result).toBe(270);
    expect(result).toBeGreaterThanOrEqual(40);
    expect(result).toBeLessThanOrEqual(500);
  });

  it("always returns an integer", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.7);
    const result = randomIntFromInterval(40, 500);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe("createArray", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates an array of specified length", () => {
    const result = createArray(3);
    expect(result).toHaveLength(3);
  });

  it("returns empty array when length is 0", () => {
    const result = createArray(0);
    expect(result).toEqual([]);
  });

  it("calls randomIntFromInterval for each item", () => {
    const length = 5;
    createArray(length);
    expect(v4Mock).toHaveBeenCalledTimes(length);
  });
});
