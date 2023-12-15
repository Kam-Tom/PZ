using DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.User;

public class UserDataDto
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    public string ShippingAddress { get; set; }

    public bool NewsletterSubscription { get; set; }

    public bool EmailVerified { get; set; }
}
