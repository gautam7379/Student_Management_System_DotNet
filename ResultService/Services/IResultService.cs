using ResultService.Models;

namespace ResultService.Services
{
    public interface IResultService
    {
        Task<IEnumerable<Result>> GetAllAsync();
        Task<Result?> GetByIdAsync(int id);
        Task<Result> CreateAsync(Result result);
        Task<bool> UpdateAsync(int id, Result result);
        Task<bool> DeleteAsync(int id);
    }
}