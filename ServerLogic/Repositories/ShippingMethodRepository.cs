using DB;
using DB.Models;
using ServerLogic.DTOs.ShippingMethod;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Repositories;

public class ShippingMethodRepository : IShippingMethodRepository
{
    private readonly ApplicationDbContext _ctx;
    public ShippingMethodRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }
    public void Add(CreateShippingMethodDto request)
    {
        var shippingMethod = new ShippingMethod()
        {
            Cost = request.Cost,
            Name = request.Name
        };
        _ctx.ShippingMethods.Add(shippingMethod);
        _ctx.SaveChanges();

    }

    public IEnumerable<GetShippingMethodDto> GetAll()
    {
        var shippingMethods = _ctx.ShippingMethods.ToList();
        return shippingMethods.Select(m => new GetShippingMethodDto()
        {
            Id = m.Id,
            Name = m.Name,
            Cost = m.Cost
        }).ToList();
    }

    public void Remove(int id)
    {
        var shippingMethod = _ctx.ShippingMethods.Where(m => m.Id == id).SingleOrDefault();
        if (shippingMethod == null)
            return;

        _ctx.ShippingMethods.Remove(shippingMethod);
        _ctx.SaveChanges();
    }
}
