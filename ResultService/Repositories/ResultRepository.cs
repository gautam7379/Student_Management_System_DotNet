using Microsoft.EntityFrameworkCore;
using ResultService.Data;
using ResultService.Models;

namespace ResultService.Repositories
{
    public class ResultRepository : IResultRepository
    {
        private readonly ResultDbContext _context;

        public ResultRepository(ResultDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Result>> GetAllAsync()
        {
            return await _context.Results
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Result?> GetByIdAsync(int id)
        {
            return await _context.Results
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Result> CreateAsync(Result result)
        {
            _context.Results.Add(result);
            await _context.SaveChangesAsync();

            return result;
        }

        public async Task<bool> UpdateAsync(int id, Result result)
        {
            var existingResult = await _context.Results
                .FirstOrDefaultAsync(r => r.Id == id);

            if (existingResult == null)
            {
                return false;
            }

            existingResult.StudentId = result.StudentId;
            existingResult.CourseId = result.CourseId;
            existingResult.Marks = result.Marks;
            existingResult.Grade = result.Grade;
            existingResult.Remarks = result.Remarks;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _context.Results
                .FirstOrDefaultAsync(r => r.Id == id);

            if (result == null)
            {
                return false;
            }

            _context.Results.Remove(result);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}