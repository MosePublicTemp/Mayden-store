import { PendingRequest } from "@/utils/PendingRequest";
import { ServerURL } from "@/utils/server";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteFood } from "./ShopItemState";

export interface ShoppingListItem {
  name: string;
  price: number;
  isInTrolly: boolean;
  sortIndex: number;
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
        const updatedItems = action.payload;
        updatedItems.sort((item1, item2) => item1.sortIndex - item2.sortIndex);

        state.request = "Received";
        state.items = updatedItems;
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
        updatedItems.sort((item1, item2) => item1.sortIndex - item2.sortIndex);
        state.request = "Received";
        state.items = updatedItems;
      },
    );
    builder.addCase(
      deleteFood.fulfilled,
      (state, action: PayloadAction<{ itemId: number; success: boolean }>) => {
        state.items = state.items.filter(
          (item) => item.foodItemId != action.payload.itemId,
        );
      },
    );
    builder.addCase(
      updateSortIndex.fulfilled,
      (state, action: PayloadAction<ShoppingListItem[]>) => {
        action.payload.sort(
          (item1, item2) => item1.sortIndex - item2.sortIndex,
        );
        state.request = "Received";
        state.items = action.payload;
      },
    );
    builder.addCase(
      deleteItem.fulfilled,
      (state, action: PayloadAction<{ foodItemId: number }>) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.foodItemId,
        );
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

export type UpdateSortValues = {
  itemId: number;
  newSortIndex: number;
};

export const updateSortIndex = createAsyncThunk(
  "shopping/updateSort",
  async ({ itemId, newSortIndex }: UpdateSortValues) => {
    const response = await fetch(
      `${ServerURL}ShoppingList/reorder/${itemId}/${newSortIndex}`,
      {
        method: "put",
      },
    );
    return await response.json();
  },
);

export const deleteItem = createAsyncThunk(
  "shopping/delete",
  async (id: number) => {
    const response = await fetch(`${ServerURL}ShoppingList/${id}`, {
      method: "delete",
    });
    return await response.json();
  },
);

export const {} = slice.actions;

export default slice.reducer;
