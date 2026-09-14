import { render } from "@/utils/Testing";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import DeleteModal from "./DeleteModal";
import "@testing-library/jest-dom";

describe("DeleteModal", () => {
  it("Should render correctly", () => {
    const { container } = render(
      <DeleteModal itemName={"test"} onConfirm={vi.fn()} onClose={vi.fn()} />,
    );

    expect(container).toMatchSnapshot();
    const t = screen.getByText("Are you sure you want to delete test");
    expect(t).toBeVisible();
  });

  it("should close when close button is pressed", () => {
    const closeFunction = vi.fn();
    render(
      <DeleteModal
        onClose={closeFunction}
        onConfirm={vi.fn()}
        itemName="test"
      />,
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(closeFunction).toHaveBeenCalled();
  });
});
