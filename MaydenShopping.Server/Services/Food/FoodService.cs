using Data;
using MaydenShopping.Server;
using MaydenShopping.Server.Mapping;
using MaydenShopping.Server.Repository;
using MaydenShopping.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Common;
using Models.Food;
using System.Text.RegularExpressions;

namespace Service.Food
{
    public class FoodService : ServiceBase, IFoodService
    {

        private IRepository<FoodItem> repository;
        private IRepository<ShoppingListItem> shoppingListItemRepository;
        private ILogger<FoodService> logger;

        public FoodService(ApplicationDBContext context, ILogger<FoodService> logger)
        {
            repository = new Repository<FoodItem>(context, c => c.FoodItem);
            shoppingListItemRepository = new Repository<ShoppingListItem>(context, c => c.ShoppingListItem);
            this.logger = logger;
        }

        public FoodService(IRepository<FoodItem> repository, IRepository<ShoppingListItem> shoppingListItemRepository, ILogger<FoodService> logger)
        {
            this.repository = repository;
            this.shoppingListItemRepository = shoppingListItemRepository;
            this.logger = logger;
        }

        public async Task<IActionResult> DeleteItem(int id, CancellationToken token = default)
        {
            logger.LogInformation($"Called {nameof(DeleteItem)}");
            if(!await repository.DeleteAsync(id, token))
            {
                logger.LogError($"Could not delete FoodItem with id of ${id}");
                return NotFound(id);
            }
            var shoppingListItems = await shoppingListItemRepository.Get().Where(item => item.FoodItemId == id).ToListAsync(token);
            shoppingListItems.ForEach(async item =>
            {
                shoppingListItemRepository.Delete(item);
            });
            await repository.Save(token);
            return  Success(new { id });
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

        public async Task<IActionResult> InsertItem(FoodRequest request, CancellationToken token = default)
        {
            logger.LogInformation($"Called {nameof(InsertItem)}");
            if (request.Price < 0)
            {
                return ValidationProblem(nameof(request.Price), "Price needs to be positive");
            }
            if (!Regex.IsMatch(request.Barcode.Trim(), @"^\d+$"))
            {
                return ValidationProblem(nameof(request.Barcode), "Barcode needs to be a number");
            }
            if (request.Barcode.Trim().Length != 12)
            {
                return ValidationProblem(nameof(request.Barcode), "Barcode size is invalid");
            }

            var isAlreadyAdded = await repository.Get().AnyAsync(foodItem => foodItem.Name.ToLower() == request.Name.ToLower().Trim() || foodItem.Barcode == request.Barcode.ToLower(), token);
            if (isAlreadyAdded)
            {
                return ValidationProblem("Name", "Exists");
            }
            var foodItem = new FoodItem
            {
                Name = request.Name.Trim(),
                Barcode = request.Barcode.Trim(),
                Price = request.Price
            };

            await repository.Insert(foodItem, token);
            await repository.Save(token);
            return Success();
        }
    }
}
