using DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.User;

public class EmailSubscriptionDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public bool NewsletterSubscription { get; set; }
}
