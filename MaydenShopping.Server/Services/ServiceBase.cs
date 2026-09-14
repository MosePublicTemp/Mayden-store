using Microsoft.AspNetCore.Mvc;

namespace MaydenShopping.Server.Services
{
    public class ServiceBase
    {

        public IActionResult Success<T>(T value) where T : class
        {
            return new OkObjectResult(value);
        }

        public IActionResult Success()
        {
            return new OkResult();
        }
    }
}
