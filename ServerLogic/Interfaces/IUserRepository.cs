using DB.Models;
using ServerLogic.DTOs.User;
using ServerLogic.Helpers;
namespace ServerLogic.Interfaces;

public interface IUserRepository
{
    public User Create(RegisteDto request,string emailVerificationToken);
    public User? GetByEmail(string email);
    public User? GetById(int id);
    public void UpdateRefreshToken(User user, SimpleToken token);
    public void VerifiEmail(User user);
    public void GenerateResetPassword(User user, SimpleToken token);
    public void ResetPassword(User user,string newPassword);
    public void Delete(User user);
    public void UpdateNewslatter(User user);
    public void ChangeOptions(User user, string currency, string numOfProductOnPage);
    public IEnumerable<UserDataDto> GetAllUsersData();
    public IEnumerable<EmailSubscriptionDto> GetAllEmailSubscriptions();
    public JwtService.UserRole GetUserRole(User user);
}

