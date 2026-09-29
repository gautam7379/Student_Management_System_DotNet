using Microsoft.EntityFrameworkCore;
using TeacherServices.Data;
using TeacherServices.Repositories;
using TeacherServices.Services;

namespace TeacherServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register TeacherDbContext
            builder.Services.AddDbContext<TeacherDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("TeacherConnection")));

            // Register Repository
            builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();

            // Register Service
            builder.Services.AddScoped<ITeacherService, TeacherService>();

            // Add controllers
            builder.Services.AddControllers();

            // Add Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Enable Swagger
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}