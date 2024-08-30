using System.ComponentModel.DataAnnotations;
namespace BikeRepairAPI.Dto.Order;

public class QueryOrderDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public int CustomerId { get; set; }

    [Required]
    public string ServiceType { get; set; } = null!;

    public string ExpectedDueDate { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string BikeBrand { get; set; } = null!;

    [MaxLength(300)]
    public string? Note { get; set; } = null;
}