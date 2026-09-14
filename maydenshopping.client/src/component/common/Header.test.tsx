import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Header from "./Header";
import "@testing-library/jest-dom";

const navigateMock = vi.fn();

vi.mock("react-router", () => {
  return { useNavigate: () => navigateMock };
});

describe("Header", () => {
  it("Should render title and button with Shop button", () => {
    const { container } = render(<Header title="Title" to="Shop" />);

    expect(container).toMatchSnapshot();
    const title = screen.getByText("Title");
    const button = screen.getByRole("button", { name: "Go to Shop" });

    expect(title).toBeVisible();
    expect(button).toBeVisible();
  });

  it("Should render title and button with Shopping button", () => {
    const { container } = render(<Header title="Title" to="Shopping" />);

    expect(container).toMatchSnapshot();
    const title = screen.getByText("Title");
    const button = screen.getByRole("button", { name: "Go to Shopping" });

    expect(title).toBeVisible();
    expect(button).toBeVisible();
  });

  it("Should render navigate the user to the shop", () => {
    render(<Header title="Title" to="Shop" />);
    const button = screen.getByRole("button", { name: "Go to Shop" });

    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith("shop");
  });

  it("Should render navigate the user to the shopping list", () => {
    render(<Header title="Title" to="Shopping" />);
    const button = screen.getByRole("button", { name: "Go to Shopping" });

    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith("..");
  });
});
