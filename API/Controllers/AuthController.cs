using BCrypt.Net;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;

namespace API.Controllers;

public class AuthController : ControllerBase
{
    private readonly IUserRepository _repo;
    private readonly JwtService _jwtService;

    public AuthController(IUserRepository repo, JwtService jwtService)
    {
        _repo = repo;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisteDto request)
    {
        User user = _repo.GetByEmail(request.Email);
        if (user != null)
            return Conflict("Email already registered");

        user = _repo.Create(request);

        return Ok(user);
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto request)
    {
        User user = _repo.GetByEmail(request.Email);
        if (user == null)
            return BadRequest("User not found");

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return BadRequest("Wrong password");

        var token = _jwtService.GenerateToken(user);

        return Ok(token);
    }
}

