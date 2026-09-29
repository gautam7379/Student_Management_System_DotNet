using TeacherServices.Models;

namespace TeacherServices.Repositories
{
    public interface ITeacherRepository
    {
        Task<IEnumerable<Teacher>> GetAllAsync();

        Task<Teacher?> GetByIdAsync(int id);

        Task<Teacher> CreateAsync(Teacher teacher);

        Task<bool> UpdateAsync(int id, Teacher teacher);

        Task<bool> DeleteAsync(int id);
    }
}