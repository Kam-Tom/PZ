using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Primitives;
using ServerLogic.DTOs.Order;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Repositories;

public class OrderListRepository : IOrderListRepository
{
    private readonly ApplicationDbContext _ctx;
    public OrderListRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }


    //public IEnumerable<Order> GetOrders(string email)
    //{
    //    var orders = _ctx.Orders.Where(o => o.User.Email == email);
    //    return orders;
    //}

    //public Order? GetOrder(string email)
    //{
    //    var order = _ctx.Orders.Where(o => o.User.Email == email).Where(o => o.Status == Order.OrderStatusType.InBasket).FirstOrDefault();
    //    return order;
    //}
    //public void Add(Product product)
    //{

    //}
    //public void Create()
    //{
        
    //}

    //public void ChangeStatus(Order order, Order.OrderStatusType status)
    //{
    //    order.Status = status;
    //    _ctx.SaveChanges();
    //}



    public bool Add(Product product,int amount, Order order)
    {
 
        var orderItems = order.OrderItems.Where(o => o.Product == product).SingleOrDefault();

        if(orderItems == null)
        {
            if (product.Stock < amount)
                return false;
            order.OrderItems.Add(new OrderItem
            {
                Product = product,
                Cost = amount * product.Price,
                Quantity = amount
            });
        }
        else
        {
            if (product.Stock < amount+orderItems.Quantity)
                return false;

            orderItems.Quantity += amount;
            orderItems.Cost += amount * product.Price;
        }

        _ctx.SaveChanges();

        return true;

    }

    public Order GetBasket(string email)
    {
        var user = _ctx.Users.Where(u => u.Email == email).Include(u => u.Orders).ThenInclude(o => o.OrderItems).SingleOrDefault();
        var basket = user.Orders.Where(o => o.Status == Order.OrderStatusType.InBasket).SingleOrDefault();
        if(basket == null)
        {
            basket = new Order()
            {
                User = user,
                Status = Order.OrderStatusType.InBasket,
                OrderItems = new List<OrderItem>()
            };
            _ctx.Orders.Add(basket);
            _ctx.SaveChanges();
        }

        return basket;
    }
    public GetOrderDto GetBasketData(string email)
    {
        var user = _ctx.Users
            .Where(u => u.Email == email)
            .Include(u => u.Orders)
                .ThenInclude(o => o.OrderItems)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.Images)
            .Include(u => u.Orders)
                .ThenInclude(o => o.OrderItems)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.Promotions)
            .SingleOrDefault();

        var basket = user.Orders.Where(o => o.Status == Order.OrderStatusType.InBasket).SingleOrDefault();

        if (basket == null)
            return new GetOrderDto();

        return new GetOrderDto()
        {
            OrderId = basket.Id,
            Status = basket.Status.ToString(),
            Cost = getProductsPromitonsCost(basket),
            Date = basket.Date,
            Items = basket.OrderItems.Select(i => new OrderItemDto() {
                Name=i.Product.Name, 
                Quantity = i.Quantity,
                ImageUrl = i.Product.Images.Where(i => i.IsThumbnail == true).FirstOrDefault().ImagePath,
                Id = i.Product.Id,
                Price = i.Product.Price,
            })

        };

    }
    private decimal getProductsPromitonsCost(Order order)
    {
        decimal total = 0;
        foreach (var o in order.OrderItems) 
        {
            Promotion? promotion = o.Product.Promotions.OrderByDescending(p => p.Discount).FirstOrDefault();
            if (promotion != null)
                total += (o.Product.Price * (100 - promotion.Discount) / 100) * o.Quantity;
            else 
                total += o.Product.Price * o.Quantity;
        }

        return total;
    }
    public IEnumerable<GetOrderDto> GetAll(string email)
    {
        var user =  _ctx.Users.Where(u => u.Email == email).Include(u => u.Orders).ThenInclude(u => u.OrderItems).ThenInclude(i => i.Product).SingleOrDefault();
        if(user == null)
            return new List<GetOrderDto>();
        var orders = user.Orders.Select(o =>
        {
            return new GetOrderDto
            {
                OrderId = o.Id,
                Date = o.Date,
                Cost = o.OrderItems.Sum(i => i.Cost),
                Status = o.Status.ToString(),
                Items = o.OrderItems.Select(i => new OrderItemDto() { Name = i.Product.Name, Quantity = i.Quantity })
            };
        });
        
        return orders;
    }

    public void Remove(Product product,int amount, Order order)
    {
        var orderItems = order.OrderItems.Where(o => o.ProductId == product.Id).FirstOrDefault();
        if (orderItems == null)
            return;
        if (orderItems.Quantity > amount)
        {
            orderItems.Quantity -= amount;
            orderItems.Cost -= product.Price * amount;
        }
        else
            order.OrderItems.Remove(orderItems);

        _ctx.SaveChanges();


    }

    public void Buy(Order basket)
    {
        basket.Status = Order.OrderStatusType.Processing;

        foreach (var orderItem in basket.OrderItems)
        {
            var product = _ctx.Products.Find(orderItem.ProductId);

            if (product != null)
            {
                // Ensure that the product stock is sufficient before deducting
                if (product.Stock >= orderItem.Quantity)
                    product.Stock -= orderItem.Quantity;
                else
                    throw new InvalidOperationException("Insufficient stock for product: " + product.Name);
            }
            else
                throw new InvalidOperationException("Product not found for ID: " + orderItem.ProductId);
            
        }

        _ctx.SaveChanges();
    }

}
