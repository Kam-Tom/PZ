using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.Payment;
using ServerLogic.DTOs.ShippingMethod;
using ServerLogic.Interfaces;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IPaymentRepository _repo;

    public PaymentController(IPaymentRepository repo)
    {
        _repo = repo;
    }
    [HttpPost, Authorize(Roles ="Admin")]
    public ActionResult Add([FromBody] CreatePaymentMethodDto request)
    {
        //_repo.Add(request);
        return Ok();
    }
    [HttpGet]
    public ActionResult GetAll()
    {
        return Ok();
        //return Ok(_repo.GetAll());
    }
    [HttpDelete("{id}"), Authorize(Roles = "Admin")]
    public ActionResult Remove([FromRoute] int id)
    {
        //_repo.Remove(id);
        return Ok();
    }
}
