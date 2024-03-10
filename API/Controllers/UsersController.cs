using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System.Security.Claims;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _repo;

    public UsersController(IUserRepository repo)
    {
        _repo = repo;
    }
    [HttpGet("Get"), Authorize(Roles = "Admin")]
    public ActionResult Get()
    {
        return Ok(_repo.GetAllUsersData());
    }
    [HttpGet("GetByEmail"), Authorize]
    public ActionResult GetByEmail()
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);
        var user = _repo.GetByEmail(email);

        if (user != null)
            return Ok(user);
        else
            return BadRequest("User dont exist" + email);
    }
    [HttpDelete, Authorize(Roles = "Admin")]
    public ActionResult Delete(int userId)
    {
        Console.WriteLine("OK");
        var user = _repo.GetById(userId);

        if (user != null)
            _repo.Delete(user);
        else
            return BadRequest("User dont exist");

        return Ok("User deleted successful");
    }
}
