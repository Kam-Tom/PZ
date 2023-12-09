using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using ServerLogic.DTOs;
using ServerLogic.Interfaces;

namespace ServerLogic.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _ctx;

    public UserRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }

    public User Create(RegisteDto request)
    {
        User user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            NewsletterSubscription = false,
            Username = $"{request.Name} {request.Surname}",
            ShippingAddress = ""
        };

        _ctx.Users.Add(user);

        _ctx.SaveChanges();

        return user;
    }

    public User GetByEmail(string email)
    {
        return _ctx.Users.Where(u => u.Email == email).FirstOrDefault();
    }
}
