using Microsoft.AspNetCore.Mvc;
using Models.Common;
using Models.Food;

namespace MaydenShopping.Server.Services.Food
{
    public interface IFoodService
    {

        public Task<IActionResult> GetItems(RequestList request, CancellationToken token = default);

        public Task<IActionResult> DeleteItem(int id, CancellationToken token = default);

        public Task<IActionResult> InsertItem(FoodRequest request, CancellationToken token = default);
    }
}
