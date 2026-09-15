using Microsoft.AspNetCore.Mvc;

namespace MaydenShopping.Server.Services.ShoppingList
{
    public interface IShoppingListService
    {

        Task<IActionResult> GetShoppingList(CancellationToken token);

        Task<IActionResult> InsertFoodItem(int foodItemId, CancellationToken token);

        Task<IActionResult> ReorderFoodItem(int id, int newSortIndex, CancellationToken token);

        Task<IActionResult> DeleteFoodItem(int foodItemId, CancellationToken token);
    }
}
