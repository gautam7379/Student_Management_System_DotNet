using AttendanceService.Models;

namespace AttendanceService.Services
{
    public interface IAttendanceService
    {
        Task<IEnumerable<Attendance>> GetAllAsync();
        Task<Attendance?> GetByIdAsync(int id);
        Task<Attendance> CreateAsync(Attendance attendance);
        Task<bool> UpdateAsync(int id, Attendance attendance);
        Task<bool> DeleteAsync(int id);
    }
}