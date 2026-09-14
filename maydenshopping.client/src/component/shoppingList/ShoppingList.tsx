import { useAppDispatch, useAppSelector } from "../../store";
import Header from "../common/Header";
import { useEffect } from "react";
import { requestShoppingList } from "../../store/state/ShoppingListState";
import ShoppingListTable from "./ShoppingListTable";

const FoodList = () => {
  const dispatch = useAppDispatch();
  const { request } = useAppSelector((state) => state.shoppingList);
  useEffect(() => {
    if (request === "Never") {
      dispatch(requestShoppingList());
    }
  }, [request]);
  return (
    <div>
      <Header title="Shopping List" to="Shop" />
      <ShoppingListTable />
    </div>
  );
};

export default FoodList;
