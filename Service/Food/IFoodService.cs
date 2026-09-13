using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Food
{
    public interface IFoodService
    {

        public FoodResponse Get(int id, CancellationToken token = default);

        public ReponseList<FoodResponse> GetItems(CancellationToken token = default);
    }
}
