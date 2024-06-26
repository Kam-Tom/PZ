﻿using DB.Models;
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

    public DateTime CreatedAt { get; set; }

    public string? Currency { get; set; }

    public string? NumOfProductOnPage { get; set; }

    public string? ProdPromotion { get; set; }
    public string? ProdDatePromotion { get; set; }
    public string? ProdValuePromotion { get; set; }
}
