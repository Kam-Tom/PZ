namespace DB.Models;
public class ProductFile
{
    public int Id { get; set; }

    public string FilePath { get; set; }

    public string Description { get; set; }

    public int ProductId { get; set; }

    public virtual Product Product { get; set; }
}
