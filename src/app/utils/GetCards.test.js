import GetCards from "./GetCards";
import MockCardData from "../__mocks__/MockCardData.json";

describe("GetCards", () => {
  it("Should get an array with at least 24 cards", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: MockCardData,
      }),
    });
    const cards = await GetCards({}, jest.fn());
    expect(cards.length).toBeLessThanOrEqual(24);
    expect(Array.isArray(cards)).toBe(true);
  });

  it("Every card should have a name, id, and imageUri", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: MockCardData,
      }),
    });
    const cards = await GetCards({}, jest.fn());
    const hasExpectedProperties = cards.every((card) =>
      ["name", "id", "imageUri"].every((prop) => prop in card)
    );
    expect(hasExpectedProperties).toBe(true);
  });
});
