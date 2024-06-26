﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System.Security.Claims;
using API.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NewsletterController : ControllerBase
{
    private readonly IUserRepository _repo;

    public NewsletterController(IUserRepository repo)
    {
        _repo = repo;
    }

    [HttpPut("PutNewsletter")]
    public ActionResult PutNewsletter(MailData mailData)
    {
        Console.WriteLine("Sending Newsletter " + mailData.EmailSubject);

        var users = _repo.GetAllEmailSubscriptions();

        MailService mailService = new MailService();

        mailData.EmailName = "DreamyGadget Newsletter";

        foreach (var user in users)
        {
            if (user.NewsletterSubscription == true)
            {
                mailData.EmailReceiver = user.Email;

                mailService.SendMail(mailData);
            }
        }

        return Ok("Newsletter sent succesfully");
    }
}
