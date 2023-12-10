using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

#nullable disable warnings
namespace DB.Models;
public class Product
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public decimal Price { get; set; }

    public int Stock { get; set; }

    public int CategoryId { get; set; }

    public Category Category { get; set; }

    [Range(0,100)]
    [Precision(3, 1)]
    public decimal VAT { get; set; }

    public bool Hidden { get; set; }

    public ICollection<Review> Reviews { get; set; }

    public ICollection<Promotion> Promotions { get; set; }

    public ICollection<ProductFile> Files { get; set; } 

    public ICollection<ProductImage> Images { get; set; }

}
