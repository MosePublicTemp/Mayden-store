import { render } from "@testing-library/react";
import TablePagination from "./TablePagination";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

describe("TablePagination", () => {
  it("Should render correctly", () => {
    const { container } = render(
      <TablePagination currentPage={1} showingCount={10} totalItems={6} />,
    );

    expect(container).toMatchSnapshot();
    const page1 = screen.getByRole("button", { name: "1" });
    expect(page1).toBeVisible();
  });

  it("Should render multiple pages max of 2", () => {
    render(<TablePagination currentPage={1} showingCount={1} totalItems={6} />);

    for (var index = 1; index <= 3; index++) {
      const pageButton = screen.getByRole("button", { name: `${index}` });
      expect(pageButton).toBeVisible();
    }
  });

  it("Should render multiple pages max of next", () => {
    render(<TablePagination currentPage={1} showingCount={1} totalItems={2} />);

    for (var index = 1; index <= 2; index++) {
      const pageButton = screen.getByRole("button", { name: `${index}` });
      expect(pageButton).toBeVisible();
    }
  });

  it("Should render multiple pages including previous", () => {
    render(<TablePagination currentPage={4} showingCount={1} totalItems={6} />);

    for (var index = 2; index <= 6; index++) {
      const pageButton = screen.getByRole("button", { name: `${index}` });
      expect(pageButton).toBeVisible();
    }
  });
});
