namespace Models.Food
{
    public class FoodResponse
    {

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Barcode { get; set; } = string.Empty;
        public double Price { get; set; }
    }
}
