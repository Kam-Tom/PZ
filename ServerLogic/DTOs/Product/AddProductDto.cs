using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.Product;

public class AddProductDto
{
    public string Name { get; set; }
    public string Category { get; set; }
    public 
    string Description { get; set; }
    decimal Price { get; set; }
    int Stock { get; set; }
    public decimal VAT;
    public bool Hidden;

}
