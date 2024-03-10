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

        if (product == null)
            return BadRequest("Product dont exist");

        if (!_orderRepo.Add(product,1,basket))
            return BadRequest("Can't add product");
        return Ok("Product added to basket");
    }

    [HttpDelete, Authorize]
    public ActionResult RemoveFromCart([FromQuery] int productId,[FromQuery] int amount)
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);

        var basket = _orderRepo.GetBasket(email);
        if (basket == null)
            return BadRequest("User dont exist");

        Console.WriteLine("PRODUCT ID " + productId);

        var product = _productRepo.GetById(productId);
        if(product == null)
            return BadRequest("Product dont exist");

        _orderRepo.Remove(product, amount, basket);

        return Ok("Product removed from basket");
    }
    [HttpGet("GetBasket"), Authorize]
    public ActionResult GetBasket()
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);
        var basket = _orderRepo.GetBasketData(email);

        return Ok(basket);
    }
    
    [HttpGet("GetAll"), Authorize]
    public ActionResult GetOrders()
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);
        var orders = _orderRepo.GetAll(email);
        
        return Ok(orders);
    }
    [HttpPost("Buy"), Authorize]
    public ActionResult Buy(int money)
    {
        var email = User?.FindFirstValue(ClaimTypes.Email);
        var basket = _orderRepo.GetBasket(email);
        //TMP: for now we just remove basket
        _orderRepo.Buy(basket);
        return Ok("Bought");
    }

    [HttpPut("Cancel"), Authorize]
    public ActionResult Cancel(int id)
    {
        var basket = _orderRepo.GetOrder(id);
        _orderRepo.Cancel(basket);
        return Ok("Canceled");
    }
}
