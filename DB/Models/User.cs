namespace DB.Models;


public class User
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string PasswordHash { get; set; }

    public string Email { get; set; }

    public string ShippingAddress { get; set; }

    public bool NewsletterSubscription { get; set; }

    public ICollection<Order> Orders { get; set; }

    public ICollection<Review> Reviews { get; set; }
}
