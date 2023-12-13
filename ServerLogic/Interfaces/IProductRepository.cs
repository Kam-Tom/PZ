using DB.Models;

namespace ServerLogic.Interfaces;

public interface IProductRepository
{
    public Product GetByName(string name);
    public void Update(Product product);
    public void Delete(Product product);
    public void Add(Product product);
}

