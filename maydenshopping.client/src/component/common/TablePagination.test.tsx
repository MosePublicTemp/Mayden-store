import { render } from "@testing-library/react";
import TablePagination from "./TablePagination";

describe("TablePagination", () => {
  it("Should render correctly", () => {
    const { container } = render(
      <TablePagination currentPage={1} showingCount={10} totalItems={6} />,
    );

    expect(container).toMatchSnapshot();
  });
});
