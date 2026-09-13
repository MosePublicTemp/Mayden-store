import Button from "./Button";

type TablePaginationProps = {
  currentPage: number;
  totalItems: number;
  showingCount: number;
};

const TablePagination = ({
  currentPage,
  totalItems,
  showingCount: showing,
}: TablePaginationProps) => {
  const minPage = Math.max(currentPage - 2, 1);
  const maxTotalPage = totalItems / showing;
  const maxPage = Math.min(currentPage + 2, maxTotalPage);
  const pageButtonIndex = [...Array(Math.max(1, maxPage - minPage)).keys()].map(
    (index) => index + minPage,
  );
  return (
    <div>
      {pageButtonIndex.map((index) => (
        <Button key={`page-index-button-${index}`}>{index}</Button>
      ))}
    </div>
  );
};

export default TablePagination;
