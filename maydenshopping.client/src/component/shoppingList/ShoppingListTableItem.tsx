import { ShoppingListItem } from "@/store/state/ShoppingListState";
import Button from "../common/Button";
import { useState } from "react";

type ShoppingListTableItemProps = {
  item: ShoppingListItem;
};

const ShoppingListTableItem = ({ item }: ShoppingListTableItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      id={item.id + ""}
      style={{
        borderBlockColor: "White",
        borderStyle: "solid",
        borderWidth: "2px",
      }}
    >
      <div style={{ display: "flex" }}>
        <p style={{ float: "left", width: "90%" }}>{item.name}</p>
        <Button onClick={() => setIsOpen(!isOpen)} style={{ float: "right" }}>
          Expand
        </Button>
      </div>
      {isOpen && (
        <div>
          <div style={{ display: "flex" }}>
            <label
              id={`${item.id}-price`}
              aria-label={`${item.name} price`}
              style={{ marginRight: "2pt" }}
            >
              Price:
            </label>
            <p>£{item.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListTableItem;
