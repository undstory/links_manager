import { firstLetter, sanity } from "./utilsfn";

describe("utilsfn", () => {
  describe("firstLetter", () => {
    it("capitalizes the first letter and lowercases the rest", () => {
      expect(firstLetter("hELLo")).toBe("Hello");
    });

    it("returns only the uppercased first letter for a single character", () => {
      expect(firstLetter("a")).toBe("A");
    });
  });

  describe("sanity", () => {
    it("returns a trimmed lowercase string when input is present", () => {
      expect(sanity("  TeSt  ")).toBe("test");
    });

    it("returns an empty string for null or undefined values", () => {
      expect(sanity(null)).toBe("");
      expect(sanity(undefined)).toBe("");
    });
  });
});
