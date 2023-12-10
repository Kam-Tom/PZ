namespace ServerLogic.DTOs.User;
public class SimpleToken
{
    public required string Token { get; set; }
    public DateTime Expires { get; set; }
}