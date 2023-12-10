
using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.User;

public class RegisteDto
{
    [MinLength(3)] 
    public string Name { get; set; } = string.Empty;

    [MinLength(3)] 
    public string Surname { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Not a valid email")]
    public string Email { get; set; } = string.Empty;

    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$", ErrorMessage = "Password must be between 6 and 20 characters and contain one uppercase letter, one lowercase letter, one digit and one special character.")]
    public string Password { get; set; } = string.Empty;

    [Compare("Password")]
    public string ConfirmPassword { get; set; } = string.Empty;
}
