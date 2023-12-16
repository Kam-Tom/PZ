using DB.Models;
using ServerLogic.DTOs.ShippingMethod;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Interfaces;

public interface IShippingMethodRepository
{
    public void Add(CreateShippingMethodDto request);

    public IEnumerable<GetShippingMethodDto> GetAll();
    public void Remove(int id);

}
