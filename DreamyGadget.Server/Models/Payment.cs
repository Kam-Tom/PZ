using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Models;

public class Payment
{
    public int Id { get; set; }


    public MethodType Method { get; set; }

    public StatusType Status { get; set; }

    public int OrderId { get; set; }

    public Order Order { get; set; }

    public enum MethodType
    {
        CreditCard,
        DebitCard,
        PayPal,
        BankTransfer,
        Cash
    }
    public enum StatusType
    {
        Pending,
        Completed,
        Failed,
        Refunded,
        Canceled
    }
}
