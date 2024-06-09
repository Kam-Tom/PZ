using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.Product;
public class UpdateProductDto
{
    public string? Name { get; set; }
    public int? CategoryId { get; set; }
    public string? Description { get; set; }
    public IFormFile? Thumbnail { get; set; }
    public List<IFormFile>? Images { get; set; }
    public List<IFormFile>? Files { get; set; }
    public List<string>? FilesDescription { get; set; }
    public decimal? Netto { get; set; }
    public string? VatType { get; set; }
    public int? Quantity { get; set; }
    public bool? Hidden { get; set; }
}