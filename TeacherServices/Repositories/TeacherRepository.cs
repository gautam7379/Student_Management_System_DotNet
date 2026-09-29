using Microsoft.EntityFrameworkCore;
using TeacherServices.Data;
using TeacherServices.Models;

namespace TeacherServices.Repositories
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly TeacherDbContext _context;

        public TeacherRepository(TeacherDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Teacher>> GetAllAsync()
        {
            return await _context.Teachers
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Teacher?> GetByIdAsync(int id)
        {
            return await _context.Teachers
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Teacher> CreateAsync(Teacher teacher)
        {
            _context.Teachers.Add(teacher);

            await _context.SaveChangesAsync();

            return teacher;
        }

        public async Task<bool> UpdateAsync(int id, Teacher teacher)
        {
            var existingTeacher = await _context.Teachers
                .FirstOrDefaultAsync(t => t.Id == id);

            if (existingTeacher == null)
            {
                return false;
            }

            existingTeacher.Name = teacher.Name;
            existingTeacher.Email = teacher.Email;
            existingTeacher.Phone = teacher.Phone;
            existingTeacher.Subject = teacher.Subject;
            existingTeacher.Salary = teacher.Salary;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var teacher = await _context.Teachers
                .FirstOrDefaultAsync(t => t.Id == id);

            if (teacher == null)
            {
                return false;
            }

            _context.Teachers.Remove(teacher);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}