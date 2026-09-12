namespace Data
{
    public class FoodItem : IEntity
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Barcode { get; set; }
        public double Price { get; set; }
    }
}
