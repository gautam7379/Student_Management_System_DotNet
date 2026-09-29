using CourseService.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace CourseService.Data
{
    public class CourseDbContext : DbContext
    {
        public CourseDbContext(DbContextOptions<CourseDbContext> options)
            : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .Property(c => c.Fees)
                .HasPrecision(18, 2);
        }
    }
}