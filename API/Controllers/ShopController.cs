using API.Services;
using DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.Order;
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

        //If buy is succesfull  

        MailData mailData = new MailData();

        MailService mailService = new MailService();

        mailData.EmailReceiver = email;
        mailData.EmailName = "Order Details";
        mailData.EmailSubject = "Details of your order.";
        mailData.EmailBody = "Here are the details of your order from day " + basket.Date + "\nItems in order:";

        foreach(var item in basket.OrderItems)
        {
            mailData.EmailBody += "\n" + item.Product.Name;
        }

        mailData.EmailBody += "\nOrder id: " + basket.Id;
        mailData.EmailBody += "\nThank you for purchase from DreamyGadget!";

        mailService.SendMail(mailData);

        return Ok("Bought");
    }

    [HttpPut("Cancel"), Authorize]
    public ActionResult Cancel(int id)
    {
        var basket = _orderRepo.GetOrder(id);
        _orderRepo.Cancel(basket);
        return Ok("Canceled");
    }
    [HttpGet("GetAllAsAdmin"),Authorize(Roles = "Admin")]
    public ActionResult GetAllAsAdmin()
    {
        var orders = _orderRepo.GetAllAsAdmin();
        return Ok(orders);
    }
    [HttpGet("GetDetails"), Authorize(Roles = "Admin")]
    public ActionResult GetDetails(int id)
    {
        var orders = _orderRepo.GetDetails(id);
        return Ok(orders);
    }
    [HttpPut("UpdateStatus"),Authorize(Roles = "Admin")]
    public ActionResult UpdateStatus([FromQuery]int id,[FromQuery] Order.OrderStatusType status)
    {
        
        var order = _orderRepo.GetOrder(id);
        if (order == null)
            return BadRequest("Order dont exist");
        _orderRepo.UpdateStatus(order,status);
        return Ok("Updated");
    }
}
