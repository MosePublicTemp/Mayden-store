using Microsoft.AspNetCore.Mvc;

namespace MaydenShopping.Server.Controllers
{
    public class FoodController
    {

        [HttpGet("{id}")]
        public IActionResult getFoodItem([FromRoute] Guid id, CancellationToken token = default)
        {

        }

        [HttpGet]
        public IActionResult getFoodItems(CancellationToken token = default)
        {

        }
        
    }
}
