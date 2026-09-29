using Microsoft.AspNetCore.Mvc;
using TeacherServices.Models;
using TeacherServices.Services;

namespace TeacherServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _service;

        public TeacherController(ITeacherService service)
        {
            _service = service;
        }

        // GET: api/Teacher
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetAll()
        {
            var teachers = await _service.GetAllAsync();

            return Ok(teachers);
        }

        // GET: api/Teacher/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetById(int id)
        {
            var teacher = await _service.GetByIdAsync(id);

            if (teacher == null)
            {
                return NotFound(new
                {
                    message = $"Teacher with ID {id} not found."
                });
            }

            return Ok(teacher);
        }

        // POST: api/Teacher
        [HttpPost]
        public async Task<ActionResult<Teacher>> Create(Teacher teacher)
        {
            var createdTeacher = await _service.CreateAsync(teacher);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdTeacher.Id },
                createdTeacher);
        }

        // PUT: api/Teacher/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            Teacher teacher)
        {
            var updated = await _service.UpdateAsync(id, teacher);

            if (!updated)
            {
                return NotFound(new
                {
                    message = $"Teacher with ID {id} not found."
                });
            }

            return NoContent();
        }

        // DELETE: api/Teacher/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = $"Teacher with ID {id} not found."
                });
            }

            return NoContent();
        }
    }
}