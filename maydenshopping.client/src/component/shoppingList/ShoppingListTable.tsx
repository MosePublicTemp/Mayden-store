import { useAppSelector } from "./../../store";
import ShoppingListTableItem from "./ShoppingListTableItem";

const ShoppingListTable = () => {
  const items = useAppSelector((state) => state.shoppingList.items);
  return (
    <ol>
      {items.map((item) => (
        <ShoppingListTableItem item={item} key={item.id} />
      ))}
    </ol>
  );
};

export default ShoppingListTable;
