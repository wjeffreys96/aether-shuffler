import GetCards from "./GetCards";
import MockCardData from "../__mocks__/MockCardData.json";

describe("GetCards", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
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
      ["name", "id", "imageUri"].every((prop) => {
        const value = card[prop];
        return typeof value === "string" && value !== "";
      })
    );

    expect(hasExpectedProperties).toBe(true);
  });

  it("Should handle errors and update the error state", async () => {
    const mockDispatch = jest.fn();

    global.fetch = jest.fn().mockRejectedValue();

    const cards = await GetCards({}, mockDispatch);

    expect(mockDispatch).toHaveBeenCalled();
    expect(cards).toBeFalsy();
  });
});
