using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using ServerLogic.DTOs.Review;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Repositories;

public class ReviewRepository : IReviewRepository
{
    private readonly ApplicationDbContext _ctx;
    public ReviewRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }
    public void Add(int productId,User user, AddReviewDto request)
    {

        var review = new Review()
        {
            ProductId = productId,
            Comment = request.Description,
            Rating = request.Rating,
            User = user
        };

        _ctx.Reviews.Add(review);
        _ctx.SaveChanges();
    }

    public IEnumerable<GetReviewDto> Get(int productId)
    {
        var reviews = _ctx.Reviews.Where(r => r.ProductId == productId).Include(r => r.User).ToList();

        return reviews.Select(r =>
        {
            return new GetReviewDto()
            {
                Id = r.Id,
                Rating = r.Rating,
                Description = r.Comment,
                Author = r.User.Username
            };
        }).ToList();

    }

    public bool Remove(int reviewId, User user)
    {
        var review = _ctx.Reviews.Where(r => r.Id == reviewId).SingleOrDefault();
        if (review.UserId != user.Id)
            return false;

        _ctx.Reviews.Remove(review);
        _ctx.SaveChanges();
        return true;
    }
}
