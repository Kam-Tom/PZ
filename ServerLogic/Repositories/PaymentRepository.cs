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
        var payment = _ctx.Payments.Where(p => p.Id == paymentId).Include(p => p.Order).SingleOrDefault();
        if (payment == null)
            return false;
        if (payment.Status == PaymentStatusType.Completed)
            return false;

        payment.Order.Status = Order.OrderStatusType.Shipped;
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

    public bool MakePayment(CreatePaymentMethodDto payment)
    {
        var order = _ctx.Orders.Where(o => o.Id == payment.OrderId).Include(o => o.Payments).SingleOrDefault();
        if (order == null)
            return false;
        if(order.Payments.Any(p => p.Status == PaymentStatusType.Completed))
            return false;

        order.Payments.Add(new Payment
        {
            Method = payment.Method,
            Status = PaymentStatusType.Pending,
        });

        order.Status = Order.OrderStatusType.Processing;
        
        _ctx.SaveChanges();
        return true;
    }
}
