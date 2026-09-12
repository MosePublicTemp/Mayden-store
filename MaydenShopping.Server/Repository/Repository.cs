using Data;
using Microsoft.EntityFrameworkCore;

namespace MaydenShopping.Server.Repository
{
    public class Repository<T>(ApplicationDBContext context, Func<ApplicationDBContext, DbSet<T>> dbSetGetter) : IRepository<T> where T : class, IEntity
    {

        private bool Disposed { get; set; }

        private DbSet<T> Table()
        {
            return dbSetGetter.Invoke(context);
        }

        public void Delete(T value)
        {
            Table().Remove(value);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!Disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            Disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<T> Get()
        {
            return Table();
        }

        public Task<T?> GetById(int id, CancellationToken token)
        {
            return Table().FirstOrDefaultAsync(entity => entity.Id == id, token);
        }

        public async Task Insert(T value, CancellationToken token)
        {
            await Table().AddAsync(value, token);
        }

        public async Task Save(CancellationToken token)
        {
            await context.SaveChangesAsync(token);
        }

        public void Update(T value)
        {
            Table().Entry(value).State = EntityState.Modified;
        }
    }
}
