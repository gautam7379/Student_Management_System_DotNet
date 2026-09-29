using ChatbotService.Models;
using ChatbotService.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChatbotService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IOllamaService _ollamaService;

        public ChatController(IOllamaService ollamaService)
        {
            _ollamaService = ollamaService;
        }

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Message cannot be empty.");
            }

            var response = await _ollamaService.GetResponseAsync(
                request.Message);

            return Ok(new
            {
                response = response
            });
        }
    }
}