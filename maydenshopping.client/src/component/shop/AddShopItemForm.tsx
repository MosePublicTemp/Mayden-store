import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import { FoodItem, FoodItemRequest } from "@/store/state/FoodItemsState";
import { insertFood } from "@/store/state/ShopItemState";

export type AddShopItemFormProps = {
  onClose: () => void;
};

const AddShopItemForm = ({ onClose }: AddShopItemFormProps) => {
  const [barcodeError, setBarcodeError] = useState<string | undefined>();
  const [priceError, setPriceError] = useState<string | undefined>();
  const dispatch = useDispatch();

  const validateBarcode = (input: string) => {
    if (input.trim().length != 12) {
      setBarcodeError("Barcode is 12 numbers");
      return;
    }
    if (isNaN(parseInt(input))) {
      setBarcodeError("Please enter a number");
      return;
    }
    setBarcodeError(undefined);
  };

  const validatePrice = (input: string) => {
    if (isNaN(parseInt(input))) {
      setPriceError("Please enter a number");
      return;
    }
    setPriceError(undefined);
  };

  const onSubmit: React.FormEventHandler<FoodItemRequest> = (event) => {
    event.preventDefault();
    const request: FoodItemRequest = {
      name: (event.currentTarget.name as any).value,
      barcode: (event.currentTarget.barcode as any).value,
      price: parseInt((event.currentTarget.price as any).value),
    };
    dispatch(insertFood(request));
    onClose();
  };

  const labelStyle: React.CSSProperties = {
    width: "20%",
    marginRight: "6pt",
  };

  const inputStyle: React.CSSProperties = {
    width: "80%",
    float: "right",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
  };

  const fieldSetErrorStyle: React.CSSProperties = {
    borderColor: "darkred",
  };

  return (
    <dialog open={true} style={{ width: "50%" }}>
      <form onSubmit={onSubmit as any}>
        <fieldset>
          <label htmlFor="name" inputMode="text" style={labelStyle}>
            Name
          </label>
          <Input
            id="name"
            inputMode="text"
            style={inputStyle}
            required={true}
          />
        </fieldset>
        <fieldset
          style={barcodeError === undefined ? undefined : fieldSetErrorStyle}
        >
          <label htmlFor="barcode" inputMode="decimal" style={labelStyle}>
            Barcode
          </label>
          {barcodeError !== undefined && (
            <p style={errorStyle}>{barcodeError}</p>
          )}
          <Input
            id="barcode"
            inputMode="decimal"
            style={inputStyle}
            required={true}
            onBlur={(event) => validateBarcode(event.currentTarget.value)}
          />
        </fieldset>
        <fieldset
          style={priceError === undefined ? undefined : fieldSetErrorStyle}
        >
          <label
            htmlFor="price"
            inputMode="decimal"
            style={labelStyle}
            aria-label="Price in GBP"
          >
            Price (£)
          </label>
          {priceError !== undefined && <p style={errorStyle}>{priceError}</p>}
          <Input
            id="price"
            inputMode="decimal"
            style={inputStyle}
            required={true}
            onBlur={(event) => validatePrice(event.currentTarget.value)}
          />
        </fieldset>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          disabled={barcodeError !== undefined || priceError !== undefined}
        >
          Submit
        </Button>
      </form>
    </dialog>
  );
};

export default AddShopItemForm;
