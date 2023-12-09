namespace DB.Models;
public class Payment
{
    public int Id { get; set; }


    public MethodType Method { get; set; }

    public StatusType Status { get; set; }

    public int OrderId { get; set; }

    public Order Order { get; set; }

    public enum MethodType
    {
        CreditCard,
        DebitCard,
        PayPal,
        BankTransfer,
        Cash
    }
    public enum StatusType
    {
        Pending,
        Completed,
        Failed,
        Refunded,
        Canceled
    }
}
