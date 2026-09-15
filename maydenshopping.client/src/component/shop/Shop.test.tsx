import { render } from "@/utils/Testing";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";
import Shop from "./Shop";
import { useNavigate } from "react-router";

const navigate = vi.fn();
vi.mock("react-router", () => {
  return {
    useNavigate: () => navigate,
  };
});

describe("Shop", () => {
  it("Should render correctly", () => {
    const { container } = render(<Shop />, {
      shop: {
        request: "Received",
        items: {
          items: [],
          page: 1,
          pageSize: 10,
          totalItems: 0,
        },
      },
      shoppingList: {
        request: "Received",
        items: [],
      },
    });

    expect(container).toMatchSnapshot();
    const addButton = screen.getByRole("button", { name: "Add item" });
    expect(addButton).toBeVisible();
  });

  it("Should open add item dialog", async () => {
    render(<Shop />, {
      shop: {
        request: "Received",
        items: {
          items: [],
          page: 1,
          pageSize: 10,
          totalItems: 0,
        },
      },
      shoppingList: {
        request: "Received",
        items: [],
      },
    });

    const addButton = screen.getByRole("button", { name: "Add item" });
    fireEvent.click(addButton);

    await act(async () => {
      const dialogNameLabel = await screen.findByText("Name");
      expect(dialogNameLabel).toBeVisible();
    });
  });
});
