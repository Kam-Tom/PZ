namespace DB.Models;
public class Payment
{
    public int Id { get; set; }


    public PaymentMethodType Method { get; set; }

    public PaymentStatusType Status { get; set; }

    public int OrderId { get; set; }

    public Order Order { get; set; }

    public enum PaymentMethodType
    {
        CreditCard,
        DebitCard,
        PayPal,
        BankTransfer,
        Cash
    }
    public enum PaymentStatusType
    {
        Pending,
        Completed,
        Failed,
        Refunded,
        Canceled
    }
}
