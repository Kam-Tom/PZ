using Azure.Core;
using DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.ShippingMethod;
using ServerLogic.DTOs.User;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ShippingMethodController : ControllerBase
{
    private readonly IShippingMethodRepository _repo;

    public ShippingMethodController(IShippingMethodRepository repo)
    {
        _repo = repo;
    }
    [HttpPost, Authorize(Roles = "Admin")]
    public ActionResult Add([FromBody] CreateShippingMethodDto request)
    {
        _repo.Add(request);
        return Ok();
    }
    [HttpGet]
    public ActionResult GetAll()
    {
        return Ok(_repo.GetAll());
    }
    [HttpDelete("{id}"), Authorize(Roles = "Admin")]
    public ActionResult Remove([FromRoute] int id)
    {
        _repo.Remove(id);
        return Ok();
    }


}

