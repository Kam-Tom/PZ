using System;
using System.Collections.Generic;

namespace Models;

public partial class Product
{
    public decimal Productid { get; set; }

    public string? Productname { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public decimal? Stockquantity { get; set; }

    public decimal? Categoryid { get; set; }

    public decimal? Vatrate { get; set; }

    public bool? Hidden { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Orderitem> Orderitems { get; set; } = new List<Orderitem>();

    public virtual ICollection<Productfile> Productfiles { get; set; } = new List<Productfile>();

    public virtual ICollection<Productimage> Productimages { get; set; } = new List<Productimage>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Promotion> Promotions { get; set; } = new List<Promotion>();
}
