using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.Review;

public class GetReviewDto
{
    public int Id { get; set; }
    public string Author { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    [Range(0,5)] public int Rating { get; set; }
}
