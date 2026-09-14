using Data;
using Microsoft.EntityFrameworkCore;

namespace MaydenShopping.Server.Repository
{
    public interface IRepository<T> : IDisposable where T : class, IEntity
    {

        IQueryable<T> Get();

        Task<T?> GetById(int id, CancellationToken token);

        Task Insert(T value, CancellationToken token);

        void Update(T value);

        void Delete(T value);

        public async Task<bool> DeleteAsync(int id, CancellationToken token)
        {
            var entity = await GetById(id, token);
            if (entity is not null) 
            {
                this.Delete(entity);
                return true;
            }
            return false;
        }

        Task Save(CancellationToken token);
    }
}
