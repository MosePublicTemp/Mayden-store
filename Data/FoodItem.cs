using System.Collections.ObjectModel;

namespace Data
{
    public class FoodItem : IEntity
    {

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Barcode { get; set; } = string.Empty;
        public double Price { get; set; }

        public Collection<ShoppingListItem> ShoppingListItems = default!;
    }
}
