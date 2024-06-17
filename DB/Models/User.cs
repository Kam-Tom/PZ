#nullable disable warnings
using System.Data;

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

    public string? RefreshToken { get; set; }

    public DateTime RefreshTokenExpires { get; set; }

    public string? ResetPasswordToken { get; set; }

    public DateTime? ResetPasswordTokenExpires { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? Currency { get; set; }

    public string? NumOfProductOnPage { get; set; }
    public string BruttoNetto { get; set; }

    public string? ProdPromotion { get; set; }

    public string? ProdDatePromotion { get; set; }
    public string? ProdValuePromotion { get; set; }
}
