using System;
using System.Collections.Generic;

namespace Models;

public partial class Currency
{
    public string Currencycode { get; set; } = null!;

    public decimal? Exchangerate { get; set; }
}
