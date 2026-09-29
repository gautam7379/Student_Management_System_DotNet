using CourseService.Data;
using CourseService.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly CourseDbContext _context;

        public CourseRepository(CourseDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllAsync()
        {
            return await _context.Courses
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Course?> GetByIdAsync(int id)
        {
            return await _context.Courses
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Course> CreateAsync(Course course)
        {
            _context.Courses.Add(course);

            await _context.SaveChangesAsync();

            return course;
        }

        public async Task<bool> UpdateAsync(int id, Course course)
        {
            var existingCourse = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == id);

            if (existingCourse == null)
            {
                return false;
            }

            existingCourse.CourseName = course.CourseName;
            existingCourse.Description = course.Description;
            existingCourse.DurationInMonths = course.DurationInMonths;
            existingCourse.Fees = course.Fees;
            existingCourse.TeacherName = course.TeacherName;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return false;
            }

            _context.Courses.Remove(course);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}