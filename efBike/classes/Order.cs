namespace efBike.Classes;

public class Order {
  public int Id { get; set; }
  public int CustomerId { get; set; }
  public Customer Customer { get; set; }
  public ServiceType ServiceType { get; set; }
  public DateOnly ExpectedDueDate { get; set; }
  public string BikeBrad { get; set; }
  public string Note { get; set; }
}