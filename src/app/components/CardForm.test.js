import CardForm from "./CardForm";
import { render, fireEvent, waitFor } from "@testing-library/react";
import * as GetCardsModule from "../utils/GetCards";
import MockCardData from "../__mocks__/MockCardData.json";

describe("CardForm", () => {

  const getCardsSpy = jest.spyOn(GetCardsModule, "default");

  getCardsSpy.mockResolvedValue(MockCardData);

  it("Should render without crashing", () => {

    const form = render(<CardForm />);

    expect(form).toBeTruthy();
  });

  it("Should render a form with 4 inputs", () => {
    const form = render(<CardForm />);

    let inputs = [];

    const selects = Array.from(form.getAllByRole("Select"));
    const buttons = Array.from(form.getAllByRole("submit"));

    inputs = inputs.concat(selects, buttons);

    expect(inputs.length).toBe(4);
  });

  it("Should call the onFormSubmit function when submitted", async () => {
    const mockFormSubmit = jest.fn();

    const form = render(<CardForm onFormSubmit={mockFormSubmit} />);

    const submitButton = form.getByRole("submit");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFormSubmit).toHaveBeenCalledWith(MockCardData);
    });
  });
});
