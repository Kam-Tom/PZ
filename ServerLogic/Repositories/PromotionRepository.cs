using Azure.Core;
using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using ServerLogic.DTOs.Promotion;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Repositories;

public class PromotionRepository : IPromotionRepository
{
    private readonly ApplicationDbContext _ctx;
    public PromotionRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }
    public int Add(CreatePromotionDto request)
    {
        var promotion = new Promotion()
        {
            Start = request.Start,
            End = request.End,
            Description = request.Description,
            NewNetto = request.Discount,
            Name = request.Name
        };

        _ctx.Promotions.Add(promotion);
        _ctx.SaveChanges();
        return promotion.Id;
    }

    public bool AddProduct(int productId,int promotionId)
    {
        var product = _ctx.Products.Where(p => p.Id == productId).SingleOrDefault();
        var promotion = _ctx.Promotions.Where(p => p.Id == promotionId).Include(p=>p.Products).SingleOrDefault();
        if (product == null || promotion == null)
            return false;

        promotion.Products.Add(product);
        _ctx.SaveChanges();
        return true;
    }

    public IEnumerable<GetPromotionsDto> GetAll()
    {
        var promotions = _ctx.Promotions.Include(p => p.Products).ToList();
        return promotions.Select(p =>
        {
            return new GetPromotionsDto
            {
                Name = p.Name,
                Start = p.Start,
                End = p.End,
                Description = p.Description,
                Id = p.Id,
                Discount = p.NewNetto,
                ItemCount = p.Products.Count()
            };
        }).ToList();
    }
}
