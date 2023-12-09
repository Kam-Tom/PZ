using DB.Models;
using ServerLogic.DTOs;
namespace ServerLogic.Interfaces;

public interface IUserRepository
{
    public User Create(RegisteDto request);
    public User GetByEmail(string email);
}

