using Microsoft.AspNetCore.Mvc;
using Models.Common;

namespace Service.Food
{
    public interface IFoodService
    {

        public Task<IActionResult> GetItems(RequestList request, CancellationToken token = default);
    }
}
