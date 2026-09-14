using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.ShoppingList
{
    public class ShoppingListItemResponse
    {
        public int Id { get; set; }
        public int FoodItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int SortIndex { get; set; }
        public bool IsInTrolly { get; set; }
        public double Price { get; set; }
    }
}
