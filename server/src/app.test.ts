import request from "supertest";
import app from "./app";
import { prisma } from "./lib/prisma";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("./lib/prisma", () => ({
  prisma: {
    link: {
      findMany: jest.fn(),
    },
  },
}));

describe("Express server with supertest", () => {
  const mockedFindMany = prisma.link.findMany as jest.MockedFunction<
    typeof prisma.link.findMany
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns latest links on GET /links/latest", async () => {
    mockedFindMany.mockResolvedValue([
      {
        id: 1,
        title: "Example link",
        url: "https://example.com",
        description: "Example description",
        categoryId: 1,
        isFavorite: false,
        status: "TO_READ",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);

    const response = await request(app).get("/links/latest").expect(200);

    expect(response.body).toEqual([
      expect.objectContaining({
        id: 1,
        title: "Example link",
        url: "https://example.com",
      }),
    ]);
    expect(mockedFindMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  });
});
