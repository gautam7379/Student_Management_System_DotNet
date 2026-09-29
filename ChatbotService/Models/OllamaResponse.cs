namespace ChatbotService.Models
{
    public class OllamaResponse
    {
        public string Model { get; set; } = string.Empty;

        public OllamaMessage Message { get; set; } = new();

        public bool Done { get; set; }
    }

    public class OllamaMessage
    {
        public string Role { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;
    }
}