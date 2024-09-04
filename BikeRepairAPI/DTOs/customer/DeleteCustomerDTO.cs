using System.ComponentModel.DataAnnotations;
namespace BikeRepairAPI.Dto.Customer;

public class DeleteCustomerDto
{
    [Required]
    public int Id { get; set; }
}