using Microsoft.AspNetCore.Http;
namespace ServerLogic.DTOs.Product;

public class GetProductDto
{
    public int Id { get; set;}
    public string Name { get; set;}
    public decimal Netto { get; set;}
    public string VatType { get; set; }
    public bool Hidden { get; set; }
    public decimal? PromotionNetto { get; set;}
    public int Quantity { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
}
