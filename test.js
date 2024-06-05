const add = require("./index");

describe("add function", () => {
  test("should return 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  test("should return the number itself if only one number is given", () => {
    expect(add("1")).toBe(1);
  });

  test("should return the sum of two comma-separated numbers", () => {
    expect(add("1,5")).toBe(6);
  });

  test("should return the sum of numbers separated by commas and newlines", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test("should return the sum of numbers with a custom delimiter", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  test("should return the sum of multiple comma-separated numbers", () => {
    expect(add("1,5,5,75")).toBe(86);
  });

  test("should throw an error for negative numbers", () => {
    expect(() => add("-1,2,-3")).toThrow("Negatives not allowed: -1, -3");
  });

  test("should ignore non-numeric values", () => {
    expect(add("1,a,3")).toBe(4);
  });
});
