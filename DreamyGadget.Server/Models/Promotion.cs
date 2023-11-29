using System;
using System.Collections.Generic;

namespace Models;

public partial class Promotion
{
    public decimal Promotionid { get; set; }

    public string? Promotionname { get; set; }

    public decimal? Discountpercentage { get; set; }

    public DateTime? Startdate { get; set; }

    public DateTime? Enddate { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
