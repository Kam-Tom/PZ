using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.Interfaces;
using System.Security.Claims;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ShopController : ControllerBase
{
    private readonly IOrderListRepository _orderRepo;
    private readonly IProductRepository _productRepo;

    public ShopController(IOrderListRepository orderRepo,IProductRepository productRepo)
    {
        _orderRepo = orderRepo;
        _productRepo = productRepo;
    }

    [HttpPost,Authorize]
    public ActionResult AddToCart(int productId)
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);

        var basket = _orderRepo.GetBasket(email);
        if(basket == null)
            return BadRequest("User dont exist");
        var product = _productRepo.GetById(productId);

        if (!_orderRepo.Add(product,1,basket))
            return BadRequest("Can't add product");
        return Ok("Product added to basket");
    }
    [HttpDelete, Authorize]
    public ActionResult RemoveFromCart(int productId)
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);

        var basket = _orderRepo.GetBasket(email);
        if (basket == null)
            return BadRequest("User dont exist");
        _orderRepo.Remove(productId, basket);

        return Ok("Product removed from basket");
    }
    [HttpGet("GetBasket"), Authorize]
    public ActionResult GetBasket()
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);
        var basket = _orderRepo.GetBasket(email);

        return Ok(basket);
    }
    [HttpGet("GetAll"), Authorize]
    public ActionResult GetOrders()
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);
        var orders = _orderRepo.GetAll(email);
        
        return Ok(orders);
    }
}
