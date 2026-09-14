using Data;
using MaydenShopping.Server.Mapping;
using MaydenShopping.Server.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MaydenShopping.Server.Services.ShoppingList
{
    public class ShoppingListService : ServiceBase, IShoppingListService
    {

        private IRepository<ShoppingListItem> repository;
        private IRepository<FoodItem> foodRepository;
        private ILogger<ShoppingListService> logger;


        public ShoppingListService(ApplicationDBContext context, ILogger<ShoppingListService> logger)
        {
            repository = new Repository<ShoppingListItem>(context, c => c.ShoppingListItem);
            foodRepository = new Repository<FoodItem>(context, c => c.FoodItem);
            this.logger = logger;
        }

        public ShoppingListService(IRepository<ShoppingListItem> repository, IRepository<FoodItem> foodItemRepository, ILogger<ShoppingListService> logger)
        {
            this.repository = repository;
            this.foodRepository = foodItemRepository;
            this.logger = logger;
        }

        public async Task<IActionResult> GetShoppingList(CancellationToken token)
        {
            logger.LogInformation($"Called {nameof(GetShoppingList)}");
            var results = await repository.Get().Include(x => x.FoodItem).Select(shoppingListItem => ResponseMappings.MapToResponse(shoppingListItem)).ToListAsync(token);
            return Success(results);
        }

        public async Task<IActionResult> InsertFoodItem(int foodItemId, CancellationToken token)
        {
            logger.LogInformation($"Called {nameof(GetShoppingList)}");
            var foodItem = await foodRepository.GetById(foodItemId, token);
            if (foodItem is null)
            {
                logger.LogError($"Invalid Id of {foodItemId} was called for.");
            }
            var shoppingListItem = new ShoppingListItem
            {
                FoodItem = foodItem,
                FoodItemId = foodItem.Id,
                IsInTrolly = false
            };
            await repository.Insert(shoppingListItem, token);
            return Success();
        }
    }
}
