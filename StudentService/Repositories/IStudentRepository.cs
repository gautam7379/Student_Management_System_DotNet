using StudentService.Models;

namespace StudentService.Repositories
{
    public interface IStudentRepository
    {
        Task<IEnumerable<Student>> GetAllAsync();
        Task<Student?> GetByIdAsync(int id);
        Task<Student> CreateAsync(Student student);
        Task<bool> UpdateAsync(int id, Student student);
        Task<bool> DeleteAsync(int id);
    }
}