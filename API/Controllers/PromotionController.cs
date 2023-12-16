using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.Promotion;
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
        return Ok(_repo.GetAll());
    }
    [HttpPost, Authorize(Roles = "Admin")]
    public ActionResult Create([FromBody] CreatePromotionDto request)
    {
        
        return Ok(_repo.Add(request));
    }
    [HttpPost("{promotionId}/Add/{productId}"), Authorize(Roles = "Admin")]
    public ActionResult AddProduct([FromRoute] int promotionId, [FromRoute] int productId)
    {
        if(_repo.AddProduct(productId,promotionId))
            return Ok();
        else
            return BadRequest("Promotion or Product dont exist");
    }
    
    

}
