import { render } from "@/utils/Testing";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingListTableItem from "./ShoppingListTableItem";
import { ShoppingListItem } from "@/store/state/ShoppingListState";

describe("ShoppingListTableItem", () => {
  it("Should render correctly", () => {
    const item: ShoppingListItem = {
      id: 0,
      isInTrolly: false,
      name: "Test 1",
      price: 2,
      foodItemId: 0,
    };
    const { container } = render(<ShoppingListTableItem item={item} />);

    expect(container).toMatchSnapshot();

    const itemElement = screen.getByText("Test 1");
    const priceElement = screen.queryByText("Price");

    expect(itemElement).toBeVisible();
    expect(priceElement).not.toBeInTheDocument();
  });

  it("Should expand when Expand button is pressed", () => {
    const item: ShoppingListItem = {
      id: 0,
      isInTrolly: false,
      name: "Test 1",
      price: 2,
      foodItemId: 0,
    };
    render(<ShoppingListTableItem item={item} />);

    const button = screen.getByRole("button", { name: "Expand" });
    fireEvent.click(button);

    const itemElement = screen.getByText("Test 1");
    const priceElement = screen.getByText("Price:");

    expect(itemElement).toBeVisible();
    expect(priceElement).toBeVisible();
  });
});
