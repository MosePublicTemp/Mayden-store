using MaydenShopping.Server.Services.ShoppingList;
using Microsoft.AspNetCore.Mvc;

namespace MaydenShopping.Server.Controllers
{
    [Route("[controller]")]
    public class ShoppingListController(IShoppingListService service)
    {

        [HttpGet]
        public async Task<IActionResult> GetShoppingList(CancellationToken token = default)
        {
            return await service.GetShoppingList(token);
        }

        [HttpPut(":id")]
        public async Task<IActionResult> InsertFoodItem([FromRoute] int foodItemId, CancellationToken token = default)
        {
            return await service.InsertFoodItem(foodItemId, token);
        }
    }
}
