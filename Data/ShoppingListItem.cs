namespace Data
{
    public class ShoppingListItem : IEntity
    {
        public int Id { get; set; }

        public int FoodItemId { get; set; }
        public bool IsInTrolly { get; set; }
        public int SortIndex { get; set; }

        public FoodItem FoodItem { get; set; } = default!;
    }
}
