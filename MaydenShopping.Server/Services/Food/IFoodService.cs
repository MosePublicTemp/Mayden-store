using Microsoft.AspNetCore.Mvc;
using Models.Common;
using Models.Food;

namespace Service.Food
{
    public interface IFoodService
    {

        public Task<IActionResult> Get(int id, CancellationToken token = default);

        public Task<IActionResult> GetItems(RequestList request, CancellationToken token = default);
    }
}
