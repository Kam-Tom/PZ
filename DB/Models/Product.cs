using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

#nullable disable warnings
namespace DB.Models;
public class Product
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public decimal Netto { get; set; }
    public string VatType { get; set; }

    public int Quantity { get; set; }

    public int CategoryId { get; set; }

    public Category Category { get; set; }

    public bool Hidden { get; set; }

    public ICollection<Review> Reviews { get; set; }

    public ICollection<Promotion> Promotions { get; set; }

    public ICollection<ProductFile> Files { get; set; } 

    public ICollection<ProductImage> Images { get; set; }

}
