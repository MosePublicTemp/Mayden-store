using Data;
using MaydenShopping.Server;
using MaydenShopping.Server.Mapping;
using MaydenShopping.Server.Repository;
using MaydenShopping.Server.Services;
using MaydenShopping.Server.Services.ShoppingList;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Common;
using Models.Food;

namespace Service.Food
{
    public class FoodService : ServiceBase, IFoodService
    {

        private IRepository<FoodItem> repository;
        private ILogger<FoodService> logger;

        public FoodService(ApplicationDBContext context, ILogger<FoodService> logger)
        {
            repository = new Repository<FoodItem>(context, c => c.FoodItem);
            this.logger = logger;
        }

        public FoodService(IRepository<FoodItem> repository, ILogger<FoodService> logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

        public async Task<IActionResult> GetItems(RequestList request, CancellationToken token = default)
        {
            logger.LogInformation($"Called {nameof(GetItems)}");
            var skip = (request.PageNumber - 1) * request.Showing;
            var count = await repository.Get().CountAsync(token);
            var results =  await repository.Get().Skip(skip).Take(request.Showing).Select(foodItem => ResponseMappings.MapToResponse(foodItem)).ToListAsync(token);
            return Success(new ResponseList<FoodResponse>
            {
                Items = results,
                TotalItems = count,
                Page = request.PageNumber,
                PageSize = request.Showing
            });
        }
    }
}
