using System;
using System.Collections.Generic;

namespace Models;

public partial class Payment
{
    public decimal Paymentid { get; set; }

    public decimal? Orderid { get; set; }

    public string? Paymentmethod { get; set; }

    public string? Paymentstatus { get; set; }

    public virtual Order? Order { get; set; }
}
