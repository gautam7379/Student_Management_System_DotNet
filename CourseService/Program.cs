using Microsoft.EntityFrameworkCore;
using CourseService.Data;
using CourseService.Repositories;
using CourseService.Services;

namespace CourseService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Database
            builder.Services.AddDbContext<CourseDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("CourseConnection")));

            // Repository
            builder.Services.AddScoped<ICourseRepository, CourseRepository>();

            // Service
            builder.Services.AddScoped<ICourseService, global::CourseService.Services.CourseService>();

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