using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.User;

public record LoginDto([EmailAddress(ErrorMessage = "Not a valid email")] string Email, string Password);
