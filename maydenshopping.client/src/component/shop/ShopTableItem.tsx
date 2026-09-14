import { useAppSelector } from "@/store";
import type { FoodItem } from "../../store/state/FoodItemsState";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { insertItem } from "@/store/state/ShoppingListState";
import { useState } from "react";
import DeleteModal from "../common/DeleteModal";
import { deleteFood } from "@/store/state/ShopItemState";

type ShopTableItemProps = {
  item: FoodItem;
};

const ShopTableItem = ({ item }: ShopTableItemProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { items, request } = useAppSelector((state) => state.shoppingList);
  const dispatch = useDispatch();
  const isIncluded = items.some(
    (shoppingItem) => shoppingItem.foodItemId === item.id,
  );
  const addToShoppingList = () => {
    dispatch(insertItem(item.id));
  };
  return (
    <>
      <tr key={`${item.id}-${item.barcode}`}>
        <td>{item.name}</td>
        <td>£{item.price}</td>
        <td>
          <div>
            <Button
              aria-label="Add to the shopping list"
              disabled={isIncluded || request !== "Received"}
              onClick={addToShoppingList}
            >
              Add
            </Button>
            <Button
              aria-label="Delete from the shopping list"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
      {isDeleteModalOpen && (
        <DeleteModal
          itemName={item.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            dispatch(deleteFood(item.id));
          }}
        />
      )}
    </>
  );
};

export default ShopTableItem;
