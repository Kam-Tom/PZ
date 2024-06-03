using Microsoft.AspNetCore.Http;
namespace ServerLogic.DTOs.Product;

public class ProductMinatureDto
{
    public int Id { get; set;}
    public string Name { get; set;}
    public decimal Netto { get; set;}
    public string VatType { get; set; }
    public decimal? PromotionNetto { get; set;}
    public int Quantity { get; set; }
    public string ThumbnailUrl { get; set; }
    public string Category { get; set; }
}
