﻿using DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Interfaces;
public interface IPromotionRepository
{
    public void Add();
    public void Remove();
    public void AddProduct(Promotion promotion);

}