using System.ComponentModel.DataAnnotations;
namespace BikeRepairAPI.Dto.Customer;

public class QueryCustomerDto
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [Phone]
    public string PhoneNumber { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    public List<string> Orders { get; set; } = null!;
}