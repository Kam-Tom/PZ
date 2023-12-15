using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewController : ControllerBase
{
    [HttpGet("{productId}")]
    public ActionResult Get([FromRoute] int productId)
    {
        return Ok();
    }

    [HttpPost]
    public ActionResult Add()
    {
        return Ok();
    }
    [HttpDelete]
    public ActionResult Delete()
    {
        return Ok();
    }
}
