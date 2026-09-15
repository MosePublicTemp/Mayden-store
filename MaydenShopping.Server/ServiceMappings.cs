using MaydenShopping.Server.Services.Food;
using MaydenShopping.Server.Services.ShoppingList;

namespace MaydenShopping.Server
{
    public static class ServiceMappings
    {

        public static void AddServiceMappings(this IServiceCollection services)
        {
            services.AddScoped<IFoodService, FoodService>();
            services.AddScoped<IShoppingListService, ShoppingListService>();
        }
    }
}
