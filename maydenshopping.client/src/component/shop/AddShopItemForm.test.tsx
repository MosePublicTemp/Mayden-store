import { render } from "@/utils/Testing";
import AddShopItemForm from "./AddShopItemForm";
import { screen, fireEvent, act } from "@testing-library/react";
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

  it("should have invalidation when less then 12 characters is entered to barcode", async () => {
    render(
      <AddShopItemForm
        onClose={vi.fn()}
        initialValues={{
          barcode: "12",
        }}
      />,
    );

    const barcode = screen.getByLabelText("Barcode");
    fireEvent.blur(barcode);

    await act(async () => {
      const barcodeError = await screen.findByText(
        "Barcode's are 12 numbers, found 2",
      );
      expect(barcodeError).toBeVisible();
    });
  });

  it("should have invalidation when text is entered to barcode", async () => {
    render(
      <AddShopItemForm
        onClose={vi.fn()}
        initialValues={{
          barcode: "hiiiiiiiiiii",
        }}
      />,
    );

    const barcode = screen.getByLabelText("Barcode");
    fireEvent.blur(barcode);

    await act(async () => {
      const barcodeError = await screen.findByText("Please enter a number");
      expect(barcodeError).toBeVisible();
    });
  });

  it("should have invalidation when text is entered to price", async () => {
    render(
      <AddShopItemForm
        onClose={vi.fn()}
        initialValues={{
          price: "hiiiiiiiiiii" as any,
        }}
      />,
    );

    const price = screen.getByLabelText("Price (£)");
    fireEvent.blur(price);

    await act(async () => {
      const priceError = await screen.findByText("Please enter a number");
      expect(priceError).toBeVisible();
    });
  });

  it("should have invalidation when text is entered to price", async () => {
    render(
      <AddShopItemForm
        onClose={vi.fn()}
        initialValues={{
          price: -4,
        }}
      />,
    );

    const price = screen.getByLabelText("Price (£)");
    fireEvent.blur(price);

    await act(async () => {
      const priceError = await screen.findByText("Number must be positive");
      expect(priceError).toBeVisible();
    });
  });
});
