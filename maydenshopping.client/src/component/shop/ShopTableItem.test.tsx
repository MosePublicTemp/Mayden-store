import { render } from "@/utils/Testing";
import ShopTableItem from "./ShopTableItem";
import { FoodItem } from "@/store/state/FoodItemsState";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ShopTableItem", () => {
  it("should render correctly", () => {
    const item: FoodItem = {
      id: 0,
      barcode: "",
      name: "test 1",
      price: 2.0,
    };
    const { container } = render(<ShopTableItem item={item} />, {
      shoppingList: {
        items: [],
        request: "Never",
      },
    });

    const name = screen.getByText("test 1");
    const price = screen.getByText("£2");
    const addButton = screen.getByRole("button", {
      name: "Add to the shopping list",
    });
    const deleteButton = screen.getByRole("button", {
      name: "Delete from the shopping list",
    });
    expect(container).toMatchSnapshot();
    expect(name).toBeVisible();
    expect(price).toBeVisible();
    expect(addButton).toBeVisible();
    expect(deleteButton).toBeVisible();
  });
});
