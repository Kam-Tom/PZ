namespace API.Services
{
    public interface IMailService
    {
        bool SendMail(MailData mailData);
    }
}
