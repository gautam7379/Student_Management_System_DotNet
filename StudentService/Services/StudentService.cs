using StudentService.Models;
using StudentService.Repositories;

namespace StudentService.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _repository;

        public StudentService(IStudentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Student>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Student?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Student> CreateAsync(Student student)
        {
            return await _repository.CreateAsync(student);
        }

        public async Task<bool> UpdateAsync(int id, Student student)
        {
            return await _repository.UpdateAsync(id, student);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}