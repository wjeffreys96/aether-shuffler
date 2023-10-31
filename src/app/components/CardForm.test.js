import CardForm from "./CardForm";
import { render, waitFor } from "@testing-library/react";
import * as GetCardsModule from "../utils/GetCards";
import MockCardData from "../__mocks__/MockCardData.json";
import userEvent from "@testing-library/user-event";

describe("CardForm", () => {
  const user = userEvent.setup();
  const getCardsSpy = jest.spyOn(GetCardsModule, "default");

  getCardsSpy.mockResolvedValue(MockCardData);

  it("Should render without crashing", () => {
    const form = render(<CardForm />);

    expect(form).toBeTruthy();
  });

  it("Should render a form with 4 inputs", () => {
    const form = render(<CardForm />);

    let inputs = [];

    const selects = form.getAllByRole("Select");
    const buttons = form.getAllByRole("submit");

    inputs = inputs.concat(selects, buttons);

    expect(inputs.length).toBe(4);
  });

  it("Should allow the user to select parameters to search with", async () => {
    const form = render(<CardForm />);

    const colorIdSelect = form.getByLabelText("Color:");
    const cardTypeSelect = form.getByLabelText("Card Type:");
    const cardFunctionSelect = form.getByLabelText("Card Function:");

    user.selectOptions(colorIdSelect, "White");
    user.selectOptions(cardTypeSelect, "Instant");
    user.selectOptions(cardFunctionSelect, "Removal");

    expect(await form.findByText("White")).toBeTruthy();
    expect(await form.findByText("Instant")).toBeTruthy();
    expect(await form.findByText("Removal")).toBeTruthy();
  });

  it("Should call the onFormSubmit function when submitted", async () => {
    const mockFormSubmit = jest.fn();

    const form = render(<CardForm onFormSubmit={mockFormSubmit} />);

    const submitButton = form.getByRole("submit");

    user.click(submitButton);

    await waitFor(() => {
      expect(mockFormSubmit).toHaveBeenCalledWith(MockCardData);
    });
  });
});
