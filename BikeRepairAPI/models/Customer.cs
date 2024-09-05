namespace BikeRepairAPI.Models;

public class Customer {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string Email { get; set; } = null!;

    public List<Order>? Orders { get; set; } = new List<Order>();
}