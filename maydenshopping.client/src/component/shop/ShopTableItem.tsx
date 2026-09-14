import { useAppSelector } from "@/store";
import type { FoodItem } from "../../store/state/FoodItemsState";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { insertItem } from "@/store/state/ShoppingListState";

type ShopTableItemProps = {
  item: FoodItem;
};

const ShopTableItem = ({ item }: ShopTableItemProps) => {
  const { items, request } = useAppSelector((state) => state.shoppingList);
  const dispatch = useDispatch();
  const isIncluded = items.some(
    (shoppingItem) => shoppingItem.foodItemId === item.id,
  );
  const addToShoppingList = () => {
    dispatch(insertItem(item.id));
  };
  return (
    <tr key={`${item.id}-${item.barcode}`}>
      <td>{item.name}</td>
      <td>£{item.price}</td>
      <td>
        <div>
          <Button
            aria-label="Add to shopping list"
            disabled={isIncluded || request !== "Received"}
            onClick={addToShoppingList}
          >
            Add
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ShopTableItem;
