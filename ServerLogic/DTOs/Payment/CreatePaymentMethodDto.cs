using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DB.Models.Payment;

namespace ServerLogic.DTOs.Payment;

public class CreatePaymentMethodDto
{
    public int Id { get; set; }
    public PaymentMethodType Method { get; set; }
    public int OrderId { get; set; }
}
