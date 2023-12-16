using Microsoft.AspNetCore.Http;
namespace ServerLogic.DTOs.Product;

public class ProductMinatureDto
{
    public int Id { get; set;}
    public string Name { get; set;}
    public decimal Price { get; set;}
    public decimal? PromotionPrice { get; set;}
    public int Stock { get; set; }
    public string ThumbnailUrl { get; set; }
    public string Category { get; set; }
}
