using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
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
                Status = Order.OrderStatusType.InBasket
            };
            _ctx.Orders.Add(basket);
            _ctx.SaveChanges();
        }

        return basket;
    }

    public IEnumerable<Order> GetAll(string email)
    {
        var user =  _ctx.Users.Where(u => u.Email == email).Include(u => u.Orders).ThenInclude(u => u.OrderItems).SingleOrDefault();
        if(user == null)
            return new List<Order>();
        
        return user.Orders;
    }

    public void Remove(int productId, Order order)
    {
        var orderItems = order.OrderItems.Where(o => o.ProductId == productId).FirstOrDefault();
        if(orderItems != null)
        {
            order.OrderItems.Remove(orderItems);
            _ctx.SaveChanges();
        }
    }

}
