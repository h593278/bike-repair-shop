namespace BikeRepairAPI.Models;

public class Order {
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    public ServiceType ServiceType { get; set; }
    public DateOnly ExpectedDueDate { get; set; }
    public string BikeBrand { get; set; } = null!;
    public string? Note { get; set; } = null;
}