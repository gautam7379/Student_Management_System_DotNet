using CourseService.Models;
using CourseService.Services;
using Microsoft.AspNetCore.Mvc;

namespace CourseService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _service;

        public CourseController(ICourseService service)
        {
            _service = service;
        }

        // GET: api/Course
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAll()
        {
            var courses = await _service.GetAllAsync();

            return Ok(courses);
        }

        // GET: api/Course/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetById(int id)
        {
            var course = await _service.GetByIdAsync(id);

            if (course == null)
            {
                return NotFound(new
                {
                    message = $"Course with ID {id} not found."
                });
            }

            return Ok(course);
        }

        // POST: api/Course
        [HttpPost]
        public async Task<ActionResult<Course>> Create(Course course)
        {
            var createdCourse = await _service.CreateAsync(course);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdCourse.Id },
                createdCourse);
        }

        // PUT: api/Course/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Course course)
        {
            var updated = await _service.UpdateAsync(id, course);

            if (!updated)
            {
                return NotFound(new
                {
                    message = $"Course with ID {id} not found."
                });
            }

            return NoContent();
        }

        // DELETE: api/Course/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = $"Course with ID {id} not found."
                });
            }

            return NoContent();
        }
    }
}