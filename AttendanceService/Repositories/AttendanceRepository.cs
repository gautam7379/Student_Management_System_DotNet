using AttendanceService.Data;
using AttendanceService.Models;
using Microsoft.EntityFrameworkCore;

namespace AttendanceService.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly AttendanceDbContext _context;

        public AttendanceRepository(AttendanceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Attendance>> GetAllAsync()
        {
            return await _context.Attendances
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Attendance?> GetByIdAsync(int id)
        {
            return await _context.Attendances
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Attendance> CreateAsync(Attendance attendance)
        {
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return attendance;
        }

        public async Task<bool> UpdateAsync(int id, Attendance attendance)
        {
            var existingAttendance = await _context.Attendances
                .FirstOrDefaultAsync(a => a.Id == id);

            if (existingAttendance == null)
            {
                return false;
            }

            existingAttendance.StudentId = attendance.StudentId;
            existingAttendance.CourseId = attendance.CourseId;
            existingAttendance.AttendanceDate = attendance.AttendanceDate;
            existingAttendance.Status = attendance.Status;
            existingAttendance.Remarks = attendance.Remarks;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var attendance = await _context.Attendances
                .FirstOrDefaultAsync(a => a.Id == id);

            if (attendance == null)
            {
                return false;
            }

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}