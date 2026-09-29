using AttendanceService.Models;
using AttendanceService.Services;
using Microsoft.AspNetCore.Mvc;

namespace AttendanceService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _service;

        public AttendanceController(IAttendanceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendance>>> GetAll()
        {
            var attendance = await _service.GetAllAsync();

            return Ok(attendance);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Attendance>> GetById(int id)
        {
            var attendance = await _service.GetByIdAsync(id);

            if (attendance == null)
            {
                return NotFound(new
                {
                    message = $"Attendance with ID {id} not found."
                });
            }

            return Ok(attendance);
        }

        [HttpPost]
        public async Task<ActionResult<Attendance>> Create(Attendance attendance)
        {
            var createdAttendance =
                await _service.CreateAsync(attendance);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdAttendance.Id },
                createdAttendance);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            Attendance attendance)
        {
            var updated =
                await _service.UpdateAsync(id, attendance);

            if (!updated)
            {
                return NotFound(new
                {
                    message = $"Attendance with ID {id} not found."
                });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted =
                await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = $"Attendance with ID {id} not found."
                });
            }

            return NoContent();
        }
    }
}