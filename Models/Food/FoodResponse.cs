using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Food
{
    public class FoodResponse
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Barcode { get; set; }
        public double Price { get; set; }
    }
}
