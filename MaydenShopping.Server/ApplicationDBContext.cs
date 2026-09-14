using Data;
using Microsoft.EntityFrameworkCore;

namespace MaydenShopping.Server
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        public DbSet<FoodItem> FoodItem { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodItem>().HasMany(e => e.ShoppingListItems).WithOne(e => e.FoodItem).HasForeignKey(e => e.FoodItemId).IsRequired();
        }
    }
}
