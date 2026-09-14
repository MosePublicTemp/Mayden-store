using MaydenShopping.Server.Services.ShoppingList;
using Microsoft.AspNetCore.Mvc;

namespace MaydenShopping.Server.Controllers
{
    [Route("[controller]")]
    public class ShoppingListController(IShoppingListService service) : Controller
    {

        [HttpGet]
        public async Task<IActionResult> GetShoppingList(CancellationToken token = default)
        {
            return await service.GetShoppingList(token);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> InsertFoodItem(int id, CancellationToken token = default)
        {
            return await service.InsertFoodItem(id, token);
        }
    }
}
