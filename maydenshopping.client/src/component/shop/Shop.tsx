import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { requestItems } from "./../../store/state/ShopItemState";
import { defaultState } from "./../../utils/RequestList";
import Header from "../common/Header";
import ShopTable from "./ShopTable";
import AddShopItemForm from "./AddShopItemForm";
import Button from "../common/Button";

const Shop = () => {
  const dispatch = useAppDispatch();
  const { request } = useAppSelector((state) => state.shop);
  useEffect(() => {
    if (request === "Never") {
      dispatch(requestItems(defaultState));
    }
  }, [request]);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  return (
    <div>
      <Header title="Shop" to="Shopping" />
      <div>
        <Button
          style={{ float: "left" }}
          onClick={() => setIsAddItemOpen(true)}
        >
          Add item
        </Button>
      </div>
      {isAddItemOpen && (
        <AddShopItemForm onClose={() => setIsAddItemOpen(false)} />
      )}
      {request === "Received" && <ShopTable />}
    </div>
  );
};

export default Shop;
