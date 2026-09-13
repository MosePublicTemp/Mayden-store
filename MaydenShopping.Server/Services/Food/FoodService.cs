using Data;
using MaydenShopping.Server;
using MaydenShopping.Server.Mapping;
using MaydenShopping.Server.Repository;
using MaydenShopping.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Common;
using Models.Food;

namespace Service.Food
{
    public class FoodService : ServiceBase, IFoodService
    {

        private IRepository<FoodItem> repository;

        public FoodService(ApplicationDBContext context)
        {
            repository = new Repository<FoodItem>(context, c => c.FoodItem);
        }

        public FoodService(IRepository<FoodItem> repository)
        {
            this.repository = repository;
        }

        public Task<IActionResult> Get(int id, CancellationToken token = default)
        {
            throw new NotImplementedException();
        }

        public async Task<IActionResult> GetItems(RequestList request, CancellationToken token = default)
        {
            var skip = (request.PageNumber - 1) * request.Showing;
            var count = await repository.Get().CountAsync(token);
            var results =  await repository.Get().Skip(skip).Take(request.Showing).Select(foodItem => FoodMappings.MapToResponse(foodItem)).ToListAsync(token);
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
