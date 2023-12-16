using DB.Models;
using ServerLogic.DTOs.Review;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Interfaces;
public interface IReviewRepository
{
    void Add(int productId, User user, AddReviewDto request);
    IEnumerable<GetReviewDto> Get(int productId);
    bool Remove(int reviewId,User user);
}
