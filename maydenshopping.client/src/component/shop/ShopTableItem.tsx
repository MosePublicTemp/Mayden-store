import type { FoodItem } from "../../store/state/FoodItemsState";
import Button from "../common/Button";

type ShopTableItemProps = {
  item: FoodItem;
};

const ShopTableItem = ({ item }: ShopTableItemProps) => {
  return (
    <tr key={`${item.id}-${item.barcode}`}>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <Button aria-label="Add to shopping list">Add</Button>
      </td>
    </tr>
  );
};

export default ShopTableItem;
