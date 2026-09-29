using ResultService.Models;

namespace ResultService.Repositories
{
    public interface IResultRepository
    {
        Task<IEnumerable<Result>> GetAllAsync();
        Task<Result?> GetByIdAsync(int id);
        Task<Result> CreateAsync(Result result);
        Task<bool> UpdateAsync(int id, Result result);
        Task<bool> DeleteAsync(int id);
    }
}