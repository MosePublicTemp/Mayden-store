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
      sortIndex: 0,
      foodItemId: 0,
    };
    const { container } = render(
      <ShoppingListTableItem item={item} isFirst={false} isLast={false} />,
    );

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
      sortIndex: 0,
      foodItemId: 0,
    };
    render(
      <ShoppingListTableItem item={item} isFirst={false} isLast={false} />,
    );

    const expandButton = screen.getByRole("button", { name: "Expand" });
    fireEvent.click(expandButton);

    const itemElement = screen.getByText("Test 1");
    const priceElement = screen.getByText("Price:");
    const moveUpButton = screen.getByRole("button", { name: "Move Up" });
    const moveDownButton = screen.getByRole("button", { name: "Move Down" });
    const deleteButton = screen.getByRole("button", {
      name: "Remove from shopping list",
    });

    expect(itemElement).toBeVisible();
    expect(priceElement).toBeVisible();
    expect(moveUpButton).toBeVisible();
    expect(moveDownButton).toBeVisible();
    expect(deleteButton).toBeVisible();
  });

  it("Should disable move up button when isFirst is true", () => {
    const item: ShoppingListItem = {
      id: 0,
      isInTrolly: false,
      name: "Test 1",
      price: 2,
      sortIndex: 0,
      foodItemId: 0,
    };
    render(<ShoppingListTableItem item={item} isFirst={true} isLast={false} />);

    const expandButton = screen.getByRole("button", { name: "Expand" });
    fireEvent.click(expandButton);

    const moveUpButton = screen.getByRole("button", { name: "Move Up" });
    expect(moveUpButton).toBeDisabled();
  });

  it("Should disable move down button when isLast is true", () => {
    const item: ShoppingListItem = {
      id: 0,
      isInTrolly: false,
      name: "Test 1",
      price: 2,
      sortIndex: 0,
      foodItemId: 0,
    };
    render(<ShoppingListTableItem item={item} isFirst={false} isLast={true} />);

    const expandButton = screen.getByRole("button", { name: "Expand" });
    fireEvent.click(expandButton);

    const moveDownButton = screen.getByRole("button", { name: "Move Down" });
    expect(moveDownButton).toBeDisabled();
  });
});
