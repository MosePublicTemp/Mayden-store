import {
  deleteItem,
  ShoppingListItem,
  updateSortIndex,
} from "@/store/state/ShoppingListState";
import Button from "../common/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteModal from "../common/DeleteModal";

type ShoppingListTableItemProps = {
  item: ShoppingListItem;
  isLast: boolean;
  isFirst: boolean;
};

const ShoppingListTableItem = ({
  item,
  isFirst,
  isLast,
}: ShoppingListTableItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const moveSort = (index: number) => {
    dispatch(
      updateSortIndex({
        itemId: item.id,
        newSortIndex: index + item.sortIndex,
      }),
    );
  };
  return (
    <div
      id={item.id + ""}
      role="listitem"
      style={{
        borderBlockColor: "White",
        borderStyle: "solid",
        borderWidth: "2px",
        marginTop: "5pt",
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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "right",
              }}
            >
              <Button disabled={isFirst} onClick={() => moveSort(-1)}>
                Move Up
              </Button>

              <Button disabled={isLast} onClick={() => moveSort(1)}>
                Move Down
              </Button>

              <Button onClick={() => setIsDeleteModal(true)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModal && (
        <DeleteModal
          itemName={item.name}
          onConfirm={() => {
            dispatch(deleteItem(item.id));
          }}
          onClose={() => setIsDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ShoppingListTableItem;
