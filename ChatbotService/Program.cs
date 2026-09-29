using ChatbotService.Services;

namespace ChatbotService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register HttpClient for OllamaService
            builder.Services.AddHttpClient<IOllamaService, OllamaService>(client =>
            {
                client.BaseAddress = new Uri("http://localhost:11434");
            });

            // Add controllers
            builder.Services.AddControllers();

            // Add OpenAPI
            builder.Services.AddOpenApi();

            var app = builder.Build();

            // Enable OpenAPI in Development
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            // Enable authorization
            app.UseAuthorization();

            // Map controller endpoints
            app.MapControllers();

            app.Run();
        }
    }
}