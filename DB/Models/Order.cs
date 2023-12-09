namespace DB.Models;
public class Order
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public OrderStatusType Status { get; set; }

    public int ShippingMethodId { get; set; }

    public ShippingMethod ShippingMethod { get; set; }

    public int UserId { get; set; }

    public User User { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; }

    //One order can have multiple payments. Example [Denied Payment, Denied Payment, Accepted Payment]
    public ICollection<Payment> Payments { get; set; }

    public enum OrderStatusType
    {
        Pending,
        Processing,
        Shipped,
        Delivered,
        Canceled
    }
}
