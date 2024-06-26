﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.Order;

public class GetOrderDto
{
    public string Username { get; set; } = String.Empty;
    public int OrderId { get; set; }
    public string Status { get; set; }
    public DateTime Date { get; set; }

    public IEnumerable<OrderItemDto> Items { get; set; }
    public decimal Cost { get; set; }

}
public class OrderItemDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public int Quantity { get; set; }
    public decimal Netto { get; set; }
    public decimal? PromotionNetto { get; set; }
    public string VatType { get; set; }
}
