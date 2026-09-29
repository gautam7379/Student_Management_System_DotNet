using AttendanceService.Data;
using AttendanceService.Repositories;
using AttendanceService.Services;
using Microsoft.EntityFrameworkCore;

namespace AttendanceService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Database
            builder.Services.AddDbContext<AttendanceDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("AttendanceConnection")));

            // Repository
            builder.Services.AddScoped<IAttendanceRepository, AttendanceRepository>();

            // Service
            builder.Services.AddScoped<
                IAttendanceService,
                global::AttendanceService.Services.AttendanceService>();

            // Controllers
            builder.Services.AddControllers();

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Swagger middleware
            app.UseSwagger();
            app.UseSwaggerUI();

            // Authorization
            app.UseAuthorization();

            // Controllers
            app.MapControllers();

            app.Run();
        }
    }
}