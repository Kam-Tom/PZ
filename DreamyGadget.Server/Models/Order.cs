using System;
using System.Collections.Generic;

namespace Models;

public partial class Order
{
    public decimal Orderid { get; set; }

    public decimal? Userid { get; set; }

    public DateTime? Orderdate { get; set; }

    public string? Orderstatus { get; set; }

    public virtual ICollection<Orderitem> Orderitems { get; set; } = new List<Orderitem>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User? User { get; set; }
}
