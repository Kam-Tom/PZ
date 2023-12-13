#nullable disable warnings
namespace DB.Models;
public class Category
{
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<Product> Products { get; set; } = new List<Product>();

    public int? ParentCategoryId { get; set; }

    public Category? ParentCategory { get; set; }

    public ICollection<Category> Subcategories { get; set; } = new List<Category>();

}
