using DB.Models;
using ServerLogic.DTOs.Product;

namespace ServerLogic.Interfaces;

public interface IProductRepository
{
    public Product GetByName(string name);
    public IEnumerable<Product> GetByCategory(string name);
    public void Update(Product product);
    public void Delete(Product product);
    public void Add(AddProductDto request);
}

