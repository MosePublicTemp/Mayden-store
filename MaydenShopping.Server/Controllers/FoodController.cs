using Microsoft.AspNetCore.Mvc;
using Models.Common;
using Models.Food;
using Service.Food;

namespace MaydenShopping.Server.Controllers
{
    [Route("[controller]")]
    public class FoodController(IFoodService service) : Controller
    {

        [HttpGet]
        public async Task<IActionResult> GetFoodItems([FromQuery] RequestList request, CancellationToken token = default)
        {
            return await service.GetItems(request, token);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id, CancellationToken token = default)
        {
            return await service.DeleteItem(id, token);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] FoodRequest request, CancellationToken token = default)
        {
            return await service.InsertItem(request, token);
        }
        
    }
}
