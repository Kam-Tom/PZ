using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PromotionController : ControllerBase
{
    private readonly IPromotionRepository _repo;

    public PromotionController(IPromotionRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public ActionResult GetAll()
    {
        return Ok();
    }
    //[HttpGet]
    //public Aci
}
