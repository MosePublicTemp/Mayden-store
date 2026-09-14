import { useEffect } from "react";
import { useAppSelector } from "../../store";
import TablePagination from "../common/TablePagination";
import ShopTableItem from "./ShopTableItem";
import { useDispatch } from "react-redux";
import { requestShoppingList } from "@/store/state/ShoppingListState";

const ShopTable = () => {
  const dispatch = useDispatch();
  const { items, totalItems, page, pageSize } = useAppSelector(
    (state) => state.shop.items,
  );
  //required as 'add' button disables itself if values are not fetched
  const { request } = useAppSelector((state) => state.shoppingList);
  useEffect(() => {
    if (request === "Never") {
      dispatch(requestShoppingList());
    }
  }, [request]);
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
