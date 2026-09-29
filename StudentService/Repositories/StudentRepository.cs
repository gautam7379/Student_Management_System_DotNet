using Microsoft.EntityFrameworkCore;
using StudentService.Data;
using StudentService.Models;

namespace StudentService.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly StudentDbContext _context;

        public StudentRepository(StudentDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Student>> GetAllAsync()
        {
            return await _context.Students
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Student?> GetByIdAsync(int id)
        {
            return await _context.Students
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Student> CreateAsync(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return student;
        }

        public async Task<bool> UpdateAsync(int id, Student student)
        {
            var existingStudent = await _context.Students
                .FirstOrDefaultAsync(s => s.Id == id);

            if (existingStudent == null)
            {
                return false;
            }

            existingStudent.Name = student.Name;
            existingStudent.Email = student.Email;
            existingStudent.Phone = student.Phone;
            existingStudent.Address = student.Address;
            existingStudent.DateOfBirth = student.DateOfBirth;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                return false;
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}