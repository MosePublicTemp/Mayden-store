import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { requestItems } from "./../../store/state/ShopItemState";
import { defaultState } from "./../../utils/RequestList";
import Header from "../common/Header";
import ShopTable from "./ShopTable";

const Shop = () => {
  const dispatch = useAppDispatch();
  const { request } = useAppSelector((state) => state.shop);
  useEffect(() => {
    if (request === "Never") {
      dispatch(requestItems(defaultState));
    }
  }, [request]);
  return (
    <div>
      <Header title="Shop" to="Shopping" />
      {request === "Received" && <ShopTable />}
    </div>
  );
};

export default Shop;
