using TeacherServices.Models;
using TeacherServices.Repositories;

namespace TeacherServices.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository _repository;

        public TeacherService(ITeacherRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Teacher>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Teacher?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Teacher> CreateAsync(Teacher teacher)
        {
            return await _repository.CreateAsync(teacher);
        }

        public async Task<bool> UpdateAsync(int id, Teacher teacher)
        {
            return await _repository.UpdateAsync(id, teacher);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}