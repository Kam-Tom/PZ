using System;
using System.Collections.Generic;

namespace Models;

public partial class User
{
    public decimal Userid { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? Shippingaddress { get; set; }

    public bool? Newslettersubscription { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
