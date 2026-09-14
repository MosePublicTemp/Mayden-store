import { act, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import ShoppingList from "./ShoppingList";
import { render } from "@/utils/Testing";

const navigateMock = vi.fn();

vi.mock("react-router", () => {
  return { useNavigate: () => navigateMock };
});

describe("ShoppingList", () => {
  it("Should render correctly", async () => {
    const { container } = render(<ShoppingList />, {
      shoppingList: {
        request: "Received",
        items: [],
      },
    });
    const headerTitle = screen.getByText("Shopping List");
    expect(container).toMatchSnapshot();
    expect(headerTitle).toBeVisible();
  });
});
