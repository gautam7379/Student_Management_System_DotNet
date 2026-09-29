using System.Net.Http.Json;
using ChatbotService.Models;

namespace ChatbotService.Services
{
    public class OllamaService : IOllamaService
    {
        private readonly HttpClient _httpClient;

        public OllamaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetResponseAsync(string message)
        {
            var request = new
            {
                model = "qwen2.5:1.5b",
                messages = new[]
                {
                    new
                    {
                        role = "user",
                        content = message
                    }
                },
                stream = false
            };

            var response = await _httpClient.PostAsJsonAsync(
                "/api/chat",
                request);

            response.EnsureSuccessStatusCode();

            var result = await response.Content
                .ReadFromJsonAsync<OllamaResponse>();

            return result?.Message?.Content
                   ?? "Sorry, I could not generate a response.";
        }
    }
}