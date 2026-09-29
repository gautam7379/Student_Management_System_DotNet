namespace AttendanceService.Models
{
    public class Attendance
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public int CourseId { get; set; }

        public DateTime AttendanceDate { get; set; }

        public string Status { get; set; } = string.Empty;

        public string Remarks { get; set; } = string.Empty;
    }
}