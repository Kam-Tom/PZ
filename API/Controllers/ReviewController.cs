using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.Review;
using ServerLogic.Interfaces;
using System.Security.Claims;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewController : ControllerBase
{
    private readonly IReviewRepository _repo;

    public ReviewController(IReviewRepository repo)
    {
        _repo = repo;
    }

    [HttpGet("{productId}")]
    public ActionResult Get([FromRoute] int productId)
    {
        var reviews = _repo.Get(productId);
        return Ok(reviews);
    }

    [HttpPost("{productId}"), Authorize]
    public ActionResult Add([FromRoute] int productId, [FromBody]AddReviewDto request, [FromServices] IUserRepository users)
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);

        var user = users.GetByEmail(email);
        if (user == null)
            return BadRequest("User dont exist");

        _repo.Add(productId, user, request);
        return Ok();
    }

    [HttpDelete("{reviewId}"), Authorize]
    public ActionResult Remove([FromRoute] int reviewId, [FromServices] IUserRepository users)
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);

        var user = users.GetByEmail(email);
        if (user == null)
            return BadRequest("User dont exist");

        if (!_repo.Remove(reviewId, user))
            return BadRequest("Review dont belong to user");
        else
            return Ok("Review removed");
    }
}
