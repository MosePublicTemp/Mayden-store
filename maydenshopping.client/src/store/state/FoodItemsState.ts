export interface FoodItemRequest {
  name: string;
  barcode: string;
  price: number;
}

export interface FoodItem extends FoodItemRequest {
  id: number;
}

export interface FoodItemState {}
