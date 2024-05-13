using DB;
using DB.Models;
using ServerLogic.DTOs.User;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System.Text.RegularExpressions;

namespace ServerLogic.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _ctx;

    public UserRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }

    public void UpdateRefreshToken(User user, SimpleToken token)
    {
        user.RefreshToken = token.Token;
        user.RefreshTokenExpires = token.Expires;

        _ctx.SaveChanges();
    }
    public User Create(RegisteDto request, string emailVerificationToken)
    {
        User user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            NewsletterSubscription = false,
            Username = $"{request.Name} {request.Surname}",
            ShippingAddress = "",
            EmailVerified = false,
            VerificationToken = emailVerificationToken,
            CreatedAt = DateTime.Now
        };

        _ctx.Users.Add(user);

        _ctx.SaveChanges();

        return user;
    }

    public void VerifiEmail(User user)
    {
        user.EmailVerified = true;
        _ctx.SaveChanges();
    }

    public User? GetByEmail(string email)
    {
        return _ctx.Users.Where(u => u.Email == email).FirstOrDefault();
    }
    public User? GetById(int id)
    {
        return _ctx.Users.Where(u => u.Id == id).FirstOrDefault();
    }
    public void GenerateResetPassword(User user, SimpleToken token)
    {
        user.ResetPasswordToken = token.Token;
        user.ResetPasswordTokenExpires = token.Expires;
        _ctx.SaveChanges();
    }

    public void ResetPassword(User user, string newPassword)
    {
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        _ctx.SaveChanges();
    }

    public JwtService.UserRole GetUserRole(User user)
    {
        string pattern = @"\b@admin\b";
        if (Regex.IsMatch(user.Email, pattern, RegexOptions.IgnoreCase))
            return JwtService.UserRole.Admin;
        else
            return JwtService.UserRole.User;
    }

    public void Delete(User user)
    {
        _ctx.Users.Remove(user);
        _ctx.SaveChanges();
    }

    public IEnumerable<UserDataDto> GetAllUsersData()
    {
        var users = _ctx.Users.ToList();
        var usersDto = users.Select(u =>
        new UserDataDto
        {
            Id = u.Id,
            Email = u.Email,
            Username = u.Username,
            ShippingAddress = u.ShippingAddress,
            EmailVerified = u.EmailVerified,
            NewsletterSubscription = u.NewsletterSubscription,
            CreatedAt = u.CreatedAt
        });

        return usersDto;
    }

    public IEnumerable<EmailSubscriptionDto> GetAllEmailSubscriptions()
    {
        var users = _ctx.Users.ToList();
        var usersDto = users.Select(u =>
        new EmailSubscriptionDto
        {
            Id = u.Id,
            Email = u.Email,
            NewsletterSubscription = u.NewsletterSubscription
        });

        return usersDto;
    }

    public void UpdateNewslatter(User user)
    {
        user.NewsletterSubscription = !user.NewsletterSubscription;

        _ctx.SaveChanges();
    }
}
