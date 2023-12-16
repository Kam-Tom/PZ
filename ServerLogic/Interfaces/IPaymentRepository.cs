using DB.Models;
using ServerLogic.DTOs.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DB.Models.Payment;

namespace ServerLogic.Interfaces;

public interface IPaymentRepository
{
    public IEnumerable<PaymentMethodType> GetTypes();
    public bool MakePayment(int orderId,CreatePaymentMethodDto payment);
    public bool ConfirmPayment(int paymentId);

}
