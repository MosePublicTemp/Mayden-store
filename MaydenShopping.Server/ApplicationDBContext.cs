using Data;
using Microsoft.EntityFrameworkCore;

namespace MaydenShopping.Server
{
    public class ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : DbContext(options)
    {
        public DbSet<FoodItem> FoodItem { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodItem>().HasMany(e => e.ShoppingListItems).WithOne(e => e.FoodItem).HasForeignKey(e => e.FoodItemId).IsRequired();
        }
    }
}
