using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;

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
    [HttpGet("Get")]
    public ActionResult Get()
    {
        return Ok(_repo.GetAllUsersData());
    }
    [HttpDelete]
    public ActionResult Delete(int userId)
    {
        var user = _repo.GetById(userId);

        if (user != null)
            _repo.Delete(user);
        else
            return BadRequest("User dont exist");

        return Ok("Password reset successful");
    }
}
