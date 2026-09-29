using Microsoft.AspNetCore.Mvc;
using StudentService.Models;
using StudentService.Services;

namespace StudentService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;

        public StudentController(IStudentService service)
        {
            _service = service;
        }

        // GET: api/Student
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAll()
        {
            var students = await _service.GetAllAsync();
            return Ok(students);
        }

        // GET: api/Student/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetById(int id)
        {
            var student = await _service.GetByIdAsync(id);

            if (student == null)
            {
                return NotFound(new
                {
                    message = $"Student with ID {id} not found."
                });
            }

            return Ok(student);
        }

        // POST: api/Student
        [HttpPost]
        public async Task<ActionResult<Student>> Create(Student student)
        {
            var createdStudent = await _service.CreateAsync(student);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdStudent.Id },
                createdStudent);
        }

        // PUT: api/Student/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Student student)
        {
            var updated = await _service.UpdateAsync(id, student);

            if (!updated)
            {
                return NotFound(new
                {
                    message = $"Student with ID {id} not found."
                });
            }

            return NoContent();
        }

        // DELETE: api/Student/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = $"Student with ID {id} not found."
                });
            }

            return NoContent();
        }
    }
}