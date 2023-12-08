using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models;

public class Promotion
{
    public int Id { get; set; }

    public string Name { get; set; }


    [Precision(3, 1)]
    [Range(0,100)]
    public decimal Discount { get; set; }

    public DateTime Start { get; set; }

    public DateTime End { get; set; }

    public string Description { get; set; }

    public virtual ICollection<Product> Products { get; set; }
}
