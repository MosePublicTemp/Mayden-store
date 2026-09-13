using Microsoft.AspNetCore.Mvc;
using Models.Common;
using Service.Food;

namespace MaydenShopping.Server.Controllers
{
    [Route("[controller]")]
    public class FoodController(IFoodService service) : Controller
    {

        [HttpGet(":id")]
        public async Task<IActionResult> getFoodItem([FromRoute] int id, CancellationToken token = default)
        {
            return await service.Get(id, token);
        }

        [HttpGet]
        public async Task<IActionResult> getFoodItems([FromQuery] RequestList request, CancellationToken token = default)
        {
            return await service.GetItems(request, token);
        }
        
    }
}
