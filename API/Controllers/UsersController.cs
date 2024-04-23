using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System.Security.Claims;
using API.Services;

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

    [HttpPut("PutNewslatter")]
    public ActionResult PutNewslatter(int userId)
    {
        Console.WriteLine("Newslatter Update");
        var user = _repo.GetById(userId);

        if (user != null)
            _repo.UpdateNewslatter(user);
        else
            return BadRequest("User dont exist");

        MailData mailData = new MailData();

        MailService mailService = new MailService();

        mailData.Email = user.Email;
        if(user.NewsletterSubscription == false)
        {
            mailData.EmailBody = "Anulowałeś swoją subskrybcję!" +
            " Nie będziemy do Ciebie przesyłać już newsletterów.";
        }
        else
        {
            mailData.EmailBody = "Dziękujemy za subskrybcję w naszym sklepie!" +
            " Od teraz będziemy do Ciebie przesyłać newslettery.";
        }

        mailData.EmailSubject = "Subskrybcja Newslettera";
        mailData.EmailName = "DreamGadget";

        mailService.SendMail(mailData);


        return Ok("Subscription succesfull");
    }
}
