using Data;
using Models.Food;
using Models.ShoppingList;

namespace MaydenShopping.Server.Mapping
{
    public class ResponseMappings
    {

        public static FoodResponse MapToResponse(FoodItem item)
        {
            return new FoodResponse
            {
                Barcode = item.Barcode,
                Id = item.Id,
                Name = item.Name,
                Price = item.Price
            };
        }

        public static ShoppingListItemResponse MapToResponse(ShoppingListItem item)
        {
            return new ShoppingListItemResponse
            {
                Id = item.Id,
                FoodItemId = item.FoodItemId,
                IsInTrolly = item.IsInTrolly,
                Name = item.FoodItem.Name,
                Price = item.FoodItem.Price
            };
        }
    }
}
