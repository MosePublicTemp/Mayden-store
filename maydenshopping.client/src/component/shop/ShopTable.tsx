import { useAppSelector } from "../../store";
import TablePagination from "../common/TablePagination";
import ShopTableItem from "./ShopTableItem";

const ShopTable = () => {
  const { items, totalItems, page, pageSize } = useAppSelector(
    (state) => state.shop.items,
  );
  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th aria-label="buttons">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ShopTableItem item={item} key={`${item.id}-${item.barcode}`} />
          ))}
        </tbody>
      </table>
      <TablePagination
        currentPage={page}
        showingCount={pageSize}
        totalItems={totalItems}
      />
    </>
  );
};

export default ShopTable;
