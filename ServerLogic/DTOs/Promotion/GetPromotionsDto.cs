using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.Promotion;

public class GetPromotionsDto
{
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Discount { get; set; }
    public int Id { get; set; }
    public int ItemCount { get; set; }
}
