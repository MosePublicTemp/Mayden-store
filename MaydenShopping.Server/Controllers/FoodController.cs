using Microsoft.AspNetCore.Mvc;
using Models.Common;
using Service.Food;

namespace MaydenShopping.Server.Controllers
{
    [Route("[controller]")]
    public class FoodController(IFoodService service) : Controller
    {

        [HttpGet]
        public async Task<IActionResult> getFoodItems([FromQuery] RequestList request, CancellationToken token = default)
        {
            return await service.GetItems(request, token);
        }
        
    }
}
