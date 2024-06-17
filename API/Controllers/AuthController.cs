using API.Services;
using Azure.Core;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.User;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace API.Controllers;

[ApiController]
[Route("[controller]")]
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
    public ActionResult<User> Register(RegisteDto request)
    {

        User? user = _repo.GetByEmail(request.Email);

        if (user != null)
            return Conflict("User already exists.");
        if (request.Password != request.ConfirmPassword)
            return BadRequest("Passwords do not match.");

        string emailVerificationToken = _jwtService.CreateRandomToken();
        _repo.Create(request, emailVerificationToken);

        MailService mailService = new MailService();
        MailData mailData = new MailData();

        string url = String.Format("https://localhost:5173/emailverification/?email={0}&token={1}", request.Email, emailVerificationToken);

        mailData.EmailReceiver = request.Email;
        mailData.EmailName = "Verification Email";
        mailData.EmailSubject = "Welcome to DreamyGadget!";
        mailData.EmailBody = "Hello, welcome to our site.\n" +
            "Here is your verification token:\n" +
            url;

        mailService.SendMail(mailData);

        return Ok("User Registered");
    }

    [HttpPost("login")]
    public ActionResult Login(LoginDto request)
    {
        User? user = _repo.GetByEmail(request.Email);

        if (user == null)
            return BadRequest("User not found");
        if (!user.EmailVerified)
            return BadRequest("Not verified");
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return BadRequest("Wrong password");

        var role = _repo.GetUserRole(user);

        var token = _jwtService.GenerateToken(user, role);

        var refreshToken = _jwtService.GenerateSimpleToken(TimeSpan.FromDays(7));

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires
        };
        Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);

        _repo.UpdateRefreshToken(user, refreshToken);

        return Ok(new {token, role});
    }

    [HttpPost("VerifyEmail")]
    public ActionResult VerifyEmail(VerifyEmailDto request)
    {
        User? user = _repo.GetByEmail(request.Email);

        if (user == null)
            return BadRequest("User not found");
        if (user.EmailVerified)
            return BadRequest("Already verified");
        if (user.VerificationToken != request.Token)
            return BadRequest("Invalid Token");

        _repo.VerifiEmail(user);

        return Ok("User verified");
    }

    [HttpPost("refresh-token")]
    public ActionResult<string> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];


        var oldAccessToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

        // Parse the claims from the old access token
        var handler = new JwtSecurityTokenHandler();
        var jsonToken = handler.ReadToken(oldAccessToken) as JwtSecurityToken;

        // Access the user's email claim from the old token
        string userEmail = jsonToken?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value ?? "";
        string userRole = jsonToken?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value ?? "";

        if(userEmail == "" || userRole == "")
            return BadRequest("Invalid Auth token");


        User? user = _repo.GetByEmail(userEmail);

        if (user == null)
            return BadRequest("User not found");
        if (!user.RefreshToken.Equals(refreshToken))
            return Unauthorized("Invalid refresh token");
        else if(user.RefreshTokenExpires < DateTime.Now)
            return Unauthorized("Token expired");

        var role = (JwtService.UserRole) Enum.Parse(typeof(JwtService.UserRole), userRole, true);

        var token = _jwtService.GenerateToken(user, role);

        var newRefreshToken = _jwtService.GenerateSimpleToken(TimeSpan.FromDays(7));

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = newRefreshToken.Expires
        };
        Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

        _repo.UpdateRefreshToken(user, newRefreshToken);

        return Ok(token);

    }

    [HttpPost("forgotPassword")]
    public ActionResult ForgotPassword([FromBody]string email)
    {
        User? user = _repo.GetByEmail(email);
        if (user == null)
            return BadRequest("User not found");

        var resetPasswordToken = _jwtService.GenerateSimpleToken(TimeSpan.FromHours(1));

        _repo.GenerateResetPassword(user, resetPasswordToken);

        MailData mailData = new MailData();

        string url = String.Format("https://localhost:5173/resetpassword/?email={0}&token={1}", email, resetPasswordToken.Token);

        mailData.EmailReceiver = email;
        mailData.EmailName = "Password Reset";
        mailData.EmailSubject = "Password Reset Request";
        mailData.EmailBody = "Hello!\n" +
            "There was a password reset request for your account. If it's not you who requested it...\n" +
            "well, somebody knows your e-mail, otherwise here is your reset password link\n" +
            url;

        MailService mailService = new MailService();

        mailService.SendMail(mailData);

        return Ok("Password reset email sent successfully");
    }

    [HttpPut("resetPassword")]
    public ActionResult ResetPassword([FromBody]ResetPasswordDto request)
    {
        request.ResetPasswordToken.Replace(" ", "+");

        User? user = _repo.GetByEmail(request.Email);
        if (user == null)
            return BadRequest("User not found");
        if (user.ResetPasswordToken != request.ResetPasswordToken)
        {
            return BadRequest("Invalid token");
        }
        if(user.ResetPasswordTokenExpires < DateTime.Now)
            return BadRequest("Token expired");

        _repo.ResetPassword(user, request.Password);

        return Ok("Password reset successful");
    }

    [HttpDelete("delete")]
    public ActionResult Delete(string email)
    {
        var user = _repo.GetByEmail(email);

        if (user != null)
            _repo.Delete(user);
        else
            return BadRequest("User dont exist");

        return Ok("Password reset successful");
    }


}

