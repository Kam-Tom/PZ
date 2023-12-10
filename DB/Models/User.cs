namespace DB.Models;


public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string ShippingAddress { get; set; } = string.Empty;

    public bool NewsletterSubscription { get; set; }

    public ICollection<Order> Orders { get; set; } = new List<Order>();

    public ICollection<Review> Reviews { get; set; } = new List<Review>();

    public bool EmailVerified { get; set; }

    public string? VerificationToken { get; set; }

    public string RefreshToken { get; set; } = string.Empty;

    public DateTime RefreshTokenExpires { get; set; }

    public string? ResetPasswordToken { get; set; } = string.Empty;

    public DateTime? ResetPasswordTokenExpires { get; set; }
}
