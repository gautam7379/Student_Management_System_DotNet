using AttendanceService.Models;
using AttendanceService.Repositories;

namespace AttendanceService.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _repository;

        public AttendanceService(IAttendanceRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Attendance>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Attendance?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Attendance> CreateAsync(Attendance attendance)
        {
            return await _repository.CreateAsync(attendance);
        }

        public async Task<bool> UpdateAsync(int id, Attendance attendance)
        {
            return await _repository.UpdateAsync(id, attendance);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}