

namespace Models.Common
{
    public class ResponseList<T>
    {

        public IEnumerable<T> Items { get; set; }
        public int TotalItems { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }

    }
}
