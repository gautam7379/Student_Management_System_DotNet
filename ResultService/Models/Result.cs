namespace ResultService.Models
{
    public class Result
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public int CourseId { get; set; }

        public decimal Marks { get; set; }

        public string Grade { get; set; } = string.Empty;

        public string Remarks { get; set; } = string.Empty;
    }
}