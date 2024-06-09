using DB.Models;
using ServerLogic.DTOs.Product;

namespace ServerLogic.Interfaces;

public interface IProductRepository
{
    public IEnumerable<ProductMinatureDto> GetMinaturesAll();
    public IEnumerable<ProductMinatureDto> GetMinaturesByName(string name);
    public IEnumerable<ProductMinatureDto> GetMinaturesByCategory(int categoryId);
    public IEnumerable<ProductMinatureDto> GetMinaturesByPromotion(int promotionId);
    public ProductDetailsDto GetDetails(Product product);
    public Product? GetById(int id,bool include = false);
    public Product? GetByName(string name);
    public void Add(AddProductDto request);
    public void Delete(Product product);
    public IEnumerable<GetProductDto> GetAll();
    void Update(Product product, UpdateProductDto request);
}

