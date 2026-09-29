using Microsoft.EntityFrameworkCore;
using TeacherServices.Models;

namespace TeacherServices.Data
{
    public class TeacherDbContext : DbContext
    {
        public TeacherDbContext(DbContextOptions<TeacherDbContext> options)
            : base(options)
        {
        }

        public DbSet<Teacher> Teachers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Teacher>()
                .Property(t => t.Salary)
                .HasPrecision(18, 2);
        }
    }
}