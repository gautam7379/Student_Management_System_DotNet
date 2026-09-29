namespace CourseService.Models
{
    public class Course
    {
        public int Id { get; set; }

        public string CourseName { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int DurationInMonths { get; set; }

        public decimal Fees { get; set; }

        public string TeacherName { get; set; } = string.Empty;
    }
}