﻿#nullable disable warnings
namespace DB.Models;
public class ShippingMethod
{
    public int Id { get; set; }

    public string Name { get; set; }

    public decimal Cost { get; set; }
}
