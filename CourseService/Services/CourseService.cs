using CourseService.Models;
using CourseService.Repositories;

namespace CourseService.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _repository;

        public CourseService(ICourseRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Course>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Course?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Course> CreateAsync(Course course)
        {
            return await _repository.CreateAsync(course);
        }

        public async Task<bool> UpdateAsync(int id, Course course)
        {
            return await _repository.UpdateAsync(id, course);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}