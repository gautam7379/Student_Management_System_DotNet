using ResultService.Models;
using ResultService.Repositories;

namespace ResultService.Services
{
    public class ResultService : IResultService
    {
        private readonly IResultRepository _repository;

        public ResultService(IResultRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Result>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Result?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Result> CreateAsync(Result result)
        {
            return await _repository.CreateAsync(result);
        }

        public async Task<bool> UpdateAsync(int id, Result result)
        {
            return await _repository.UpdateAsync(id, result);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}