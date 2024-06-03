using DB.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.Product;

public class ProductDetailsDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
    public string VatType { get; set; }

    public decimal Netto { get; set; }

    public int Quantity { get; set; }
    public string Category { get; set; }

    public IEnumerable<string> FileUrls { get; set; }
    public IEnumerable<string> FileDescriptions { get; set; }

    public IEnumerable<string> ImageUrls { get; set; }
    public decimal? PromotionNetto { get; internal set; }
}
