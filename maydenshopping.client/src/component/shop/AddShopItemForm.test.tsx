import { render } from "@/utils/Testing";
import AddShopItemForm from "./AddShopItemForm";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("AddShopItemForm", () => {
  it("should render correctly", () => {
    const { container } = render(<AddShopItemForm onClose={vi.fn()} />);

    expect(container).toMatchSnapshot();
    const nameLabel = screen.getByText("Name");
    const barcodeLabel = screen.getByText("Barcode");
    const priceLabel = screen.getByText("Price (£)");

    expect(nameLabel).toBeVisible();
    expect(barcodeLabel).toBeVisible();
    expect(priceLabel).toBeVisible();
  });

  it("should close when Cancel button is pressed", () => {
    const closeFunction = vi.fn();
    render(<AddShopItemForm onClose={closeFunction} />);

    const closeButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(closeButton);

    expect(closeFunction).toHaveBeenCalled();
  });
});
