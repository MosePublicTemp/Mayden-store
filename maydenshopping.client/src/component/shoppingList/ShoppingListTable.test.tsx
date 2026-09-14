import { render } from "@/utils/Testing";
import ShoppingListTable from "./ShoppingListTable";
import { ShoppingListItem } from "@/store/state/ShoppingListState";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ShoppingListTable", () => {
  it("should render correctly", () => {
    const items: ShoppingListItem[] = [
      {
        id: 0,
        isInTrolly: false,
        name: "test 1",
        price: 0.0,
      },
    ];
    const { container } = render(<ShoppingListTable />, {
      shoppingList: {
        items,
        request: "Received",
      },
    });

    expect(container).toMatchSnapshot();
    const item = screen.getByText("test 1");
    expect(item).toBeVisible();
  });

  it("should render multiple correctly", () => {
    const items: ShoppingListItem[] = [
      {
        id: 0,
        isInTrolly: false,
        name: "test 1",
        price: 0.0,
      },
      {
        id: 1,
        isInTrolly: false,
        name: "test 2",
        price: 1,
      },
    ];
    const { container } = render(<ShoppingListTable />, {
      shoppingList: {
        items,
        request: "Received",
      },
    });

    expect(container).toMatchSnapshot();
    const item1 = screen.getByText("test 1");
    const item2 = screen.getByText("test 2");
    expect(item1).toBeVisible();
    expect(item2).toBeVisible();
  });
});
