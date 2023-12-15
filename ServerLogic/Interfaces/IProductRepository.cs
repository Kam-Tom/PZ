using DB.Models;
using ServerLogic.DTOs.Product;

namespace ServerLogic.Interfaces;

public interface IProductRepository
{
    public IEnumerable<ProductMinatureDto> GetMinaturesByCategory(int categoryId);
    public ProductDetailsDto GetDetails(Product product);
    public Product? GetById(int id,bool include = false);
    public Product? GetByName(string name);
    public void Add(AddProductDto request);
    public void Delete(Product product);
}

