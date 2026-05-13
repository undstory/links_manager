import { formatTitle, normalizeText } from "./formatters";
import { describe, expect, it } from "@jest/globals";

describe("formatters", () => {
  it("normalizes whitespace and trims text", () => {
    expect(normalizeText("  hello   world  ")).toBe("hello world");
  });

  it("capitalizes the first letter of the normalized title", () => {
    expect(formatTitle("   test title  ")).toBe("Test title");
  });
});
