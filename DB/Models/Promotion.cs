﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
#nullable disable warnings
namespace DB.Models;
public class Promotion
{
    public int Id { get; set; }

    public string Name { get; set; }

    public decimal NewNetto { get; set; }

    public DateTime Start { get; set; }

    public DateTime End { get; set; }

    public string Description { get; set; }

    public virtual ICollection<Product> Products { get; set; }
}
