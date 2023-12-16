using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using ServerLogic.DTOs.Payment;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DB.Models.Payment;

namespace ServerLogic.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly ApplicationDbContext _ctx;
    public PaymentRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }
    public bool ConfirmPayment(int paymentId)
    {
        var payment = _ctx.Payments.Where(o => o.Id == paymentId).SingleOrDefault();
        if (payment == null)
            return false;
        if (payment.Status == PaymentStatusType.Completed)
            return false;

        payment.Status = PaymentStatusType.Completed;
        _ctx.SaveChanges();
        return true;
    }

    public IEnumerable<PaymentMethodType> GetTypes()
    {
        return new List<PaymentMethodType>
        {
            PaymentMethodType.PayPal,
            PaymentMethodType.DebitCard,
            PaymentMethodType.DebitCard,
            PaymentMethodType.BankTransfer,
            PaymentMethodType.Cash
        };

    }

    public bool MakePayment(int orderId, CreatePaymentMethodDto payment)
    {
        var order = _ctx.Orders.Where(o => o.Id == orderId).Include(o => o.Payments).SingleOrDefault();
        if (order == null)
            return false;
        if(order.Payments.Any(p => p.Status == Payment.PaymentStatusType.Completed))
            return false;

        order.Payments.Add(new Payment
        {
            //Method = payment.Method,
            Status = PaymentStatusType.Pending,
        });
        _ctx.SaveChanges();
        return true;
    }
}
