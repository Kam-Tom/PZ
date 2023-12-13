using DB;
using DB.Models;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _ctx;
    public ProductRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }

    public void Add(Product product)
    {
        throw new NotImplementedException();
    }

    public void Delete(Product product)
    {
        throw new NotImplementedException();
    }

    public Product GetByName(string name)
    {
        throw new NotImplementedException();
    }

    public void Update(Product product)
    {
        throw new NotImplementedException();
    }
}
