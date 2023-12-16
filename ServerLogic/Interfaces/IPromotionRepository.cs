using DB.Models;
using ServerLogic.DTOs.Promotion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Interfaces;
public interface IPromotionRepository
{
    bool AddProduct(int productId, int promotionId);
    IEnumerable<GetPromotionsDto> GetAll();
    void Add(CreatePromotionDto request);

}
