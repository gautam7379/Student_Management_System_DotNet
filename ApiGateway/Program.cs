namespace ApiGateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactPolicy", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // Add Controllers
            builder.Services.AddControllers();

            // Add OpenAPI
            builder.Services.AddOpenApi();

            // Add YARP Reverse Proxy
            builder.Services.AddReverseProxy()
                .LoadFromConfig(
                    builder.Configuration.GetSection("ReverseProxy"));

            var app = builder.Build();

            app.UseCors("ReactPolicy");

            // Configure OpenAPI
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseAuthorization();

            app.MapControllers();

            app.MapReverseProxy();

            app.Run();
        }
    }
}