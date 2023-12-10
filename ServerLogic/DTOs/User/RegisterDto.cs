using System.ComponentModel.DataAnnotations;
namespace ServerLogic.DTOs.User;

public class RegisteDto
{
    [MinLength(3)] 
    public required string Name { get; set; }

    [MinLength(3)] 
    public required string Surname { get; set; }

    [EmailAddress(ErrorMessage = "Not a valid email")]
    public required string Email { get; set; }

    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$", ErrorMessage = "Password must be between 6 and 20 characters and contain one uppercase letter, one lowercase letter, one digit and one special character.")]
    public required string Password { get; set; }

    [Compare("Password")]
    public required string ConfirmPassword { get; set; }
}
