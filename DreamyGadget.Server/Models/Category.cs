﻿using System;
using System.Collections.Generic;

namespace Models;

public class Category
{
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<Product> Products { get; set; }

    public int? ParentCategoryId { get; set; }

    public Category? ParentCategory { get; set; }

    public ICollection<Category> Subcategories { get; set; }

}
