using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.User;
public record VerifyEmailDto(
    [EmailAddress(ErrorMessage = "Not a valid email")] string Email,
    string Token);
