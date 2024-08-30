using System.ComponentModel.DataAnnotations;
namespace BikeRepairAPI.Dto.Order;

public class DeleteOrderDto
{
    [Required]
    public int id { get; set; }
}