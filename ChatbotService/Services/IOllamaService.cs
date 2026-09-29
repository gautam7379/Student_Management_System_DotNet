using ChatbotService.Models;

namespace ChatbotService.Services
{
    public interface IOllamaService
    {
        Task<string> GetResponseAsync(string message);
    }
}