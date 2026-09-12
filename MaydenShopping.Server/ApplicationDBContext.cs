using Microsoft.EntityFrameworkCore;

namespace MaydenShopping.Server
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }
    }
}
