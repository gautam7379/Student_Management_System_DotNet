using Microsoft.EntityFrameworkCore;
using ResultService.Data;
using ResultService.Repositories;
using ResultService.Services;

namespace ResultService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Database
            builder.Services.AddDbContext<ResultDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("ResultConnection")));

            // Repository
            builder.Services.AddScoped<IResultRepository, ResultRepository>();

            // Service
            builder.Services.AddScoped<
                IResultService,
                global::ResultService.Services.ResultService>();

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