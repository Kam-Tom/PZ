using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using API.Configuration;

namespace API.Services
{
    public class MailService : IMailService
    {
        public bool SendMail(MailData mailData)
        {
            MimeMessage message = new MimeMessage();

            message.From.Add(new MailboxAddress("Dream Gadget", "dreamgadgetpz@gmail.com"));

            message.To.Add(MailboxAddress.Parse(mailData.Email));

            message.Subject = mailData.EmailSubject;

            message.Body = new TextPart("plain")
            {
                Text = mailData.EmailBody
            };

            SmtpClient smtpClient = new SmtpClient();

            try
            {
                smtpClient.Connect("smtp.gmail.com", 465, true);

                smtpClient.Authenticate("dreamgadgetpz@gmail.com", "qjcp osop jatp ruqb");

                smtpClient.Send(message);

                Console.WriteLine("Email sent");
                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            finally
            {
                smtpClient.Disconnect(true);
                smtpClient.Dispose();
            }
            return false;
        }
    }
}
