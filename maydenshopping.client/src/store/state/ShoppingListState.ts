import { PendingRequest } from "@/utils/PendingRequest";
import { ServerURL } from "@/utils/server";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodItem } from "./FoodItemsState";

export interface ShoppingListItem {
  name: string;
  price: number;
  isInTrolly: boolean;
  id: number;
  foodItemId: number;
}

export interface ShoppingListState {
  items: ShoppingListItem[];
  request: PendingRequest;
}

export const initialState: ShoppingListState = {
  items: [],
  request: "Never",
};

export const slice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requestShoppingList.fulfilled,
      (state, action: PayloadAction<ShoppingListItem[]>) => {
        state.request = "Received";
        state.items = action.payload;
      },
    );
    builder.addCase(requestShoppingList.pending, (state) => {
      state = {
        ...initialState,
        request: "Sending",
      };
    });
    builder.addCase(insertItem.pending, (state) => {
      state = {
        ...initialState,
        request: "Sending",
      };
    });
    builder.addCase(
      insertItem.fulfilled,
      (state, action: PayloadAction<ShoppingListItem>) => {
        const updatedItems = [...state.items, action.payload];
        state.request = "Received";
        state.items = updatedItems;
      },
    );
  },
});

export const requestShoppingList = createAsyncThunk(
  "shopping/fetchItems",
  async () => {
    const response = await fetch(`${ServerURL}ShoppingList`, { method: "get" });
    return await response.json();
  },
);

export const insertItem = createAsyncThunk(
  "shopping/insertItem",
  async (itemId: number) => {
    const response = await fetch(`${ServerURL}ShoppingList/${itemId}`, {
      method: "put",
    });
    return await response.json();
  },
);

export const {} = slice.actions;

export default slice.reducer;
