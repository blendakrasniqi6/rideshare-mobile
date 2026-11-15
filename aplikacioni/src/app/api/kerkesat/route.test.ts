import { beforeEach, describe, expect, it, vi } from "vitest";

const { profiliImMock, getSqlMock, sqlMock } = vi.hoisted(() => ({
  profiliImMock: vi.fn(),
  getSqlMock: vi.fn(),
  sqlMock: vi.fn(),
}));

vi.mock("@/lib/lejet", () => ({
  profiliIm: profiliImMock,
}));

vi.mock("@/lib/db", () => ({
  getSql: getSqlMock,
}));

import { POST } from "./route";

describe("POST /api/kerkesat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getSqlMock.mockReturnValue(sqlMock);
  });

  it("pranon kërkesën kur ka vende të lira", async () => {
    profiliImMock.mockResolvedValue({
      id: "100",
      emri: "Test",
      roli: "udhetar",
    });

    sqlMock
      .mockResolvedValueOnce([{ id: "2", vende: 1 }])
      .mockResolvedValueOnce([{ id: 1, statusi: "pending" }]);

    const request = new Request("http://localhost/api/kerkesat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ udhetimId: "2" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.ok).toBe(true);
    expect(data.kerkesa.statusi).toBe("pending");
  });

  it("refuzon kërkesën kur nuk ka vende të lira", async () => {
    profiliImMock.mockResolvedValue({
      id: "100",
      emri: "Test",
      roli: "udhetar",
    });

    sqlMock.mockResolvedValueOnce([{ id: "2", vende: 0 }]);

    const request = new Request("http://localhost/api/kerkesat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ udhetimId: "2" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe("Nuk ka vende të lira.");
  });

  it("refuzon përdoruesin pa rolin udhëtar", async () => {
    profiliImMock.mockResolvedValue({
      id: "200",
      emri: "Test Shofer",
      roli: "shofer",
    });

    const request = new Request("http://localhost/api/kerkesat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ udhetimId: "2" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.error).toContain("Vetëm udhëtarët");
    expect(getSqlMock).not.toHaveBeenCalled();
  });
});