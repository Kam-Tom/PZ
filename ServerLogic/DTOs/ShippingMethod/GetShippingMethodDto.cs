﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.ShippingMethod;

public class GetShippingMethodDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Cost { get; set; }
}
