using System;
using System.Collections.Generic;

namespace Models;

public partial class Category
{
    public decimal Categoryid { get; set; }

    public string? Categoryname { get; set; }

    public decimal? Parentcategoryid { get; set; }

    public virtual ICollection<Category> InverseParentcategory { get; set; } = new List<Category>();

    public virtual Category? Parentcategory { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
