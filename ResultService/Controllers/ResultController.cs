using Microsoft.AspNetCore.Mvc;
using ResultService.Models;
using ResultService.Services;

namespace ResultService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        private readonly IResultService _service;

        public ResultController(IResultService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Result>>> GetAll()
        {
            var results = await _service.GetAllAsync();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (result == null)
            {
                return NotFound(new
                {
                    message = $"Result with ID {id} not found."
                });
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Result>> Create(Result result)
        {
            var createdResult = await _service.CreateAsync(result);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdResult.Id },
                createdResult);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Result result)
        {
            var updated = await _service.UpdateAsync(id, result);

            if (!updated)
            {
                return NotFound(new
                {
                    message = $"Result with ID {id} not found."
                });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = $"Result with ID {id} not found."
                });
            }

            return NoContent();
        }
    }
}