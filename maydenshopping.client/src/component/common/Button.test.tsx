import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders with margins by default", () => {
    const { container } = render(<Button>Test</Button>);
    const button = screen.getByRole("button", { name: "Test" });

    expect(container).toMatchSnapshot();
    expect(button.style.marginLeft).toBe("3pt");
    expect(button.style.marginRight).toBe("3pt");
    expect(button.style.marginBottom).toBe("2pt");
    expect(button.style.marginTop).toBe("2pt");
  });
});
