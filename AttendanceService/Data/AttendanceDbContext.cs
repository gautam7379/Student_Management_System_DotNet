using AttendanceService.Models;
using Microsoft.EntityFrameworkCore;

namespace AttendanceService.Data
{
    public class AttendanceDbContext : DbContext
    {
        public AttendanceDbContext(DbContextOptions<AttendanceDbContext> options)
            : base(options)
        {
        }

        public DbSet<Attendance> Attendances { get; set; }
    }
}