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

        public async Task<IActionResult> DeleteFoodItem(int foodItemId, CancellationToken token)
        {
            logger.LogInformation($"Called {nameof(DeleteFoodItem)}");
            if (!await repository.DeleteAsync(foodItemId, token)){
                logger.LogError($"Invalid Id of {foodItemId} was called for.");
                return NotFound();
            }
            await repository.Save(token);
            return Success(new { foodItemId });
        }

        public async Task<IActionResult> InsertFoodItem(int foodItemId, CancellationToken token)
        {
            logger.LogInformation($"Called {nameof(GetShoppingList)}");
            var foodItem = await foodRepository.GetById(foodItemId, token);
            if (foodItem is null)
            {
                logger.LogError($"Invalid Id of {foodItemId} was called for.");
                return NotFound();
            }
            var hasFoodItem = await repository.Get().AnyAsync(x => x.FoodItemId == foodItemId, token);
            if (hasFoodItem)
            {
                logger.LogError($"Id of {foodItemId} was already added.");
                return ValidationProblem("FoodItem", "Food item is already added");
            }
            var count = await repository.Get().CountAsync(token);
            var shoppingListItem = new ShoppingListItem
            {
                FoodItem = foodItem,
                FoodItemId = foodItem.Id,
                IsInTrolly = false,
                SortIndex = count,
            };
            await repository.Insert(shoppingListItem, token);
            await repository.Save(token);
            return Success(ResponseMappings.MapToResponse(shoppingListItem));
        }

        public async Task<IActionResult> ReorderFoodItem(int id, int newSortIndex, CancellationToken token)
        {
            if (newSortIndex < 0)
            {
                return ValidationProblem(nameof(newSortIndex), "New sort index is too low");

            }
            var foodItem = await repository.GetById(id, token);
            if (foodItem is null)
            {
                return NotFound(id);
            }
            var toReSort = await repository.Get().Include(x => x.FoodItem).ToListAsync(token);
            if (newSortIndex > toReSort.Count)
            {
                return ValidationProblem(nameof(newSortIndex), "New sort index is too great");
            }
            toReSort.Remove(foodItem);
            toReSort.Insert(newSortIndex, foodItem);
            for (int index = 0; index < toReSort.Count; index++)
            {
                toReSort[index].SortIndex = index;
                repository.Update(toReSort[index]);
            }
            foodItem.SortIndex = newSortIndex;
            await repository.Save(token);
            var response = toReSort.Select(item => ResponseMappings.MapToResponse(item)).OrderBy(t => t.SortIndex).ToList();
            return Success(response);
        }
    }
}
