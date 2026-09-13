using Microsoft.AspNetCore.Mvc;

namespace Models.Common
{
    public class RequestList
    {
        [FromQuery(Name = "pageNumber")]
        public int PageNumber { get; set; }

        [FromQuery(Name = "showing")]
        public int Showing { get; set; }
    }
}
