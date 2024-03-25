using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.Order;

public class GetOrderLiteDto
{
    public int OrderId { get; set; }
    public string Status { get; set; }
    public DateTime Date { get; set; }
}