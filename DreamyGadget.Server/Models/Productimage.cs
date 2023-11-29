using System;
using System.Collections.Generic;

namespace Models;

public partial class Productimage
{
    public decimal Imageid { get; set; }

    public decimal? Productid { get; set; }

    public string? Imagepath { get; set; }

    public bool? Isthumbnail { get; set; }

    public virtual Product? Product { get; set; }
}
