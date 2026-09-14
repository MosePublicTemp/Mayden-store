import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { PendingRequest } from "../../utils/PendingRequest";
import type { ResponseList } from "../../utils/ResponseList";
import type { RequestList } from "../../utils/RequestList";
import type { FoodItem } from "./FoodItemsState";
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

export const {} = slice.actions;

export default slice.reducer;
