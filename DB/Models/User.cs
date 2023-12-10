#nullable disable warnings
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

    public bool EmailVerified { get; set; }

    public string? VerificationToken { get; set; }

    public string RefreshToken { get; set; }

    public DateTime RefreshTokenExpires { get; set; }

    public string? ResetPasswordToken { get; set; }

    public DateTime? ResetPasswordTokenExpires { get; set; }
}
