import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { PendingRequest } from "../../utils/PendingRequest";
import type { ResponseList } from "../../utils/ResponseList";
import type { RequestList } from "../../utils/RequestList";
import type { FoodItem, FoodItemRequest } from "./FoodItemsState";
import { ServerURL } from "@/utils/server";

export interface ShopItemState {
  items: ResponseList<FoodItem>;
  request: PendingRequest;
}

export const initialState: ShopItemState = {
  items: {
    items: [],
    totalItems: 0,
    page: 1,
    pageSize: 0,
  },
  request: "Never",
};

export const slice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requestItems.fulfilled,
      (state, action: PayloadAction<ResponseList<FoodItem>>) => {
        state.request = "Received";
        state.items = action.payload;
      },
    );
    builder.addCase(requestItems.pending, (state) => {
      state = {
        ...initialState,
        request: "Sending",
      };
    });
    builder.addCase(
      deleteFood.fulfilled,
      (state, action: PayloadAction<{ itemId: number; success: boolean }>) => {
        state.request = "Received";
        state.items.items = state.items.items.filter(
          (item) => item.id !== action.payload.itemId,
        );
        state.items.totalItems = state.items.totalItems - 1;
      },
    );
    builder.addCase(
      insertFood.fulfilled,
      (state, action: PayloadAction<FoodItem>) => {
        const updatedItems: FoodItem[] = [...state.items.items, action.payload];
        state.items.items = updatedItems;
        state.items.totalItems = state.items.totalItems + 1;
      },
    );
  },
});

export const requestItems = createAsyncThunk(
  "shop/fetchItems",
  async (request: RequestList) => {
    const response = await fetch(
      `${ServerURL}Food?PageNumber=${request.pageNumber}&Showing=${request.showing}`,
      {
        method: "get",
      },
    );
    return await response.json();
  },
);

export const insertFood = createAsyncThunk(
  "shop/insertItems",
  async (request: FoodItemRequest) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const response = await fetch(`${ServerURL}Food`, {
      method: "post",
      body: JSON.stringify(request),
      headers: headers,
      mode: "cors",
    });
    console.log("response: " + response.status);

    return await response.json();
  },
);

export const deleteFood = createAsyncThunk(
  "shop/insertItem",
  async (itemId: number) => {
    const response = await fetch(`${ServerURL}Food/${itemId}`, {
      method: "delete",
    });
    return { itemId, success: response.ok };
  },
);

export const {} = slice.actions;

export default slice.reducer;
