using Data;

namespace Service.Food
{
    public class FoodService(IRepository<FoodItem> foodRepository) : IFoodService
    {
    }
}
