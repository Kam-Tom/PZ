﻿#nullable disable warnings
namespace DB.Models;
public class OrderItem
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    public decimal Cost { get; set; }

    public int OrderId { get; set; }

    public Order Order { get; set; }

    public int ProductId { get; set; }

    public Product Product { get; set; }
}