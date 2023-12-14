using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.Product;
public class AddProductDto
{
    [Required] public string Name { get; set; } = string.Empty;
    [Required] public int CategoryId { get; set; }
    public IFormFileCollection? Images { get; set; }
    public IFormFileCollection? Thumbnails { get; set; }
    public IFormFileCollection? Files { get; set; }
    public IEnumerable<string>? FilesDesc { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    [Required] public string Description { get; set; } = string.Empty;
    public decimal VAT;
    public bool Hidden;


}
