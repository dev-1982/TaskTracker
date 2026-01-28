using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTracker.Api.Data;
using TaskTracker.Api.Models;

namespace TaskTracker.Api.Controllers;

[ApiController]
[Route("tasks")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _db;

    public TasksController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IEnumerable<TaskItem>> GetAll()
    {
        return await _db.Tasks
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TaskItem task)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        task.Id = 0;
        task.CreatedAt = DateTime.UtcNow;

        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();

        return Ok(task);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TaskItem updated)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != updated.Id)
            return BadRequest("ID mismatch");

        var existing = await _db.Tasks.FindAsync(id);
        if (existing is null)
            return NotFound();

        existing.Title = updated.Title;
        existing.Description = updated.Description;
        existing.Status = updated.Status;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await _db.Tasks.FindAsync(id);
        if (task is null)
            return NotFound();

        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
