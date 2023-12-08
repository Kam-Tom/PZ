using System;
using System.Collections.Generic;

namespace Models;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string ShippingAddress { get; set; }

    public bool NewsletterSubscription { get; set; }

    public ICollection<Order> Orders { get; set; }

    public ICollection<Review> Reviews { get; set; }
}
