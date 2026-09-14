import Button from "./Button";

type DeleteModalProps = {
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
};

const DeleteModal = ({ itemName, onConfirm, onClose }: DeleteModalProps) => {
  return (
    <dialog open={true}>
      <p>Are you sure you want to delete {itemName}</p>
      <div>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </dialog>
  );
};

export default DeleteModal;
