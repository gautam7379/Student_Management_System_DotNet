using Microsoft.EntityFrameworkCore;
using StudentService.Data;
using StudentService.Repositories;
using StudentService.Services;

namespace StudentService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Database
            builder.Services.AddDbContext<StudentDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("StudentConnection")));

            // Repository
            builder.Services.AddScoped<IStudentRepository, StudentRepository>();

            // Service
            builder.Services.AddScoped<
                IStudentService,
                global::StudentService.Services.StudentService>();

            // Controllers
            builder.Services.AddControllers();

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Swagger
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}