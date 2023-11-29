using System;
using System.Collections.Generic;

namespace Models;

public partial class Productfile
{
    public decimal Fileid { get; set; }

    public decimal? Productid { get; set; }

    public string? Filepath { get; set; }

    public string? Filedescription { get; set; }

    public virtual Product? Product { get; set; }
}
