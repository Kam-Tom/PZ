using DB.Models;
using ServerLogic.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Interfaces;
public interface IOrderListRepository
{
    public bool Add(Product product,int amount, Order order);
    public void Remove(int productId, Order order);
    public Order GetBasket(string email);
    public IEnumerable<GetOrderDto> GetAll(string email);
    public GetOrderDto GetBasketData(string email);
}
