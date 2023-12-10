#nullable disable warnings
namespace DB.Models;
public class ProductImage
{
    public int Id { get; set; }

    public string ImagePath { get; set; }

    public bool IsThumbnail { get; set; }

    public int ProductId { get; set; }

    public Product Product { get; set; }
}
