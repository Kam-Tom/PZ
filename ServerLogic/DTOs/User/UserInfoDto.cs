namespace ServerLogic.DTOs.User;

public class UserInfoDto 
{
    public int Id { get; set; }

    public string BruttoNetto { get; set; }
    public string Currency { get; set; }
    public string NumOfProductOnPage { get; set; }
    public string? ProdPromotion { get; set; }
    public string? ProdDatePromotion { get; set; }
    public string? ProdValuePromotion { get; set; }

    public string? ShippingAddress { get; set; }

}
