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

        public IActionResult NotFound()
        {
            return new NotFoundObjectResult(null);
        }

        public IActionResult NotFound(object value)
        {
            return new NotFoundObjectResult(value);
        }

        public IActionResult ValidationProblem(string field, string error)
        {
            return new BadRequestObjectResult(new { field, error });
        }
    }
}
