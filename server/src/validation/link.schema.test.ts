import { linkSchema } from "./link.schema";
import { describe, expect, it } from "@jest/globals";

describe("linkSchema validation", () => {
  it("accepts a valid link payload", () => {
    const result = linkSchema.safeParse({
      title: "Example title",
      url: "https://example.com",
      description: "A sample description",
      categoryId: 1,
      tags: ["tag1", "tag2"],
      isFavorite: true,
      status: "TO_READ",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid URL", () => {
    const result = linkSchema.safeParse({
      title: "Example title",
      url: "not-a-valid-url",
      categoryId: 1,
    });

    expect(result.success).toBe(false);
    expect(result.success ? undefined : result.error.issues[0].message).toMatch(
      /Niewłaściwy format URL/,
    );
  });

  it("rejects too many tags", () => {
    const result = linkSchema.safeParse({
      title: "Example title",
      url: "https://example.com",
      categoryId: 1,
      tags: ["a", "b", "c", "d"],
    });

    expect(result.success).toBe(false);
    expect(result.success ? undefined : result.error.issues[0].message).toMatch(
      /Max 3 tagi/,
    );
  });
});
