import { useAppSelector } from "./../../store";
import ShoppingListTableItem from "./ShoppingListTableItem";

const ShoppingListTable = () => {
  const items = useAppSelector((state) => state.shoppingList.items);
  const price = items.reduce((a, v) => (a = a + v.price), 0);
  return (
    <div>
      <ol>
        {items.map((item, index) => (
          <ShoppingListTableItem
            item={item}
            key={item.id}
            isFirst={index == 0}
            isLast={index == items.length - 1}
          />
        ))}
      </ol>
      <p style={{ float: "left" }}>
        Total cost: £<span>{price}</span>
      </p>
    </div>
  );
};

export default ShoppingListTable;
