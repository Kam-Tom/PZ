using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

}
