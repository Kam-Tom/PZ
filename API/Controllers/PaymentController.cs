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

    [HttpPost]
    public ActionResult Pay([FromBody] CreatePaymentMethodDto request)
    {
        if (!_repo.MakePayment(request))
            return BadRequest();
        
        return Ok();
    }
    [HttpGet]
    public ActionResult GetTypes()
    {
        return Ok(_repo.GetTypes());
    }
    [HttpPatch("{id}"), Authorize(Roles = "Admin")]
    public ActionResult Confirm([FromRoute] int paymentId)
    {
        _repo.ConfirmPayment(paymentId);
        return Ok();
    }


}
