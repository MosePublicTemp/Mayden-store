using Data;
using Models.Food;

namespace MaydenShopping.Server.Mapping
{
    public class FoodMappings
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
    }
}
