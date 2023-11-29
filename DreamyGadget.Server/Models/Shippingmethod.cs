using System;
using System.Collections.Generic;

namespace Models;

public partial class Shippingmethod
{
    public decimal Shippingmethodid { get; set; }

    public string? Methodname { get; set; }

    public decimal? Shippingcost { get; set; }
}
