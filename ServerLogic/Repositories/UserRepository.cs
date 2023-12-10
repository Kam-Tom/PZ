using Azure.Core;
using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
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
            VerificationToken = emailVerificationToken
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

    public User GetByEmail(string email)
    {
        return _ctx.Users.Where(u => u.Email == email).FirstOrDefault();
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
}
