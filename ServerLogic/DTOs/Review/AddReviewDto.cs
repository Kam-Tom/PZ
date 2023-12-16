using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.Review;

public class AddReviewDto
{
    public DateTime Date { get; set; } = DateTime.Now;
    public string Description { get; set; } = string.Empty;
    [Range(0,5)]public int Rating { get; set; }
}
