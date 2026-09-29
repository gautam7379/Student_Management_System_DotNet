using TeacherServices.Models;

namespace TeacherServices.Services
{
    public interface ITeacherService
    {
        Task<IEnumerable<Teacher>> GetAllAsync();

        Task<Teacher?> GetByIdAsync(int id);

        Task<Teacher> CreateAsync(Teacher teacher);

        Task<bool> UpdateAsync(int id, Teacher teacher);

        Task<bool> DeleteAsync(int id);
    }
}