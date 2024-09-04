using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BikeRepairAPI.Dto.Order;
using efBike.Models;

namespace BikeRepairAPI.Controller;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<QueryOrderDto>>> GetOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.Customer)
            .Select(o => new QueryOrderDto
            {
                Id = o.Id,
                CustomerId = o.CustomerId,
                ServiceType = o.ServiceType.ToString(),
                ExpectedDueDate = o.ExpectedDueDate.ToString("yyyy-MM-dd"),
                BikeBrand = o.BikeBrand,
                Note = o.Note
            })
            .ToListAsync();

        return Ok(orders);
    }

    // GET: api/Orders/5
    [HttpGet("{id}")]
    public async Task<ActionResult<QueryOrderDto>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Customer)
            .Select(o => new QueryOrderDto
            {
                Id = o.Id,
                CustomerId = o.CustomerId,
                ServiceType = o.ServiceType.ToString(),
                ExpectedDueDate = o.ExpectedDueDate.ToString("yyyy-MM-dd"),
                BikeBrand = o.BikeBrand,
                Note = o.Note
            })
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }

    // POST: api/Orders
    [HttpPost]
    public async Task<ActionResult<QueryOrderDto>> PostOrder(CreateOrderDto createOrderDto)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == createOrderDto.CustomerId);

        if (customer == null)
        {
            return NotFound();
        }

        var order = new Order
        {
            CustomerId = createOrderDto.CustomerId,
            Customer = customer,
            ServiceType = Enum.Parse<ServiceType>(createOrderDto.ServiceType),
            ExpectedDueDate = DateOnly.Parse(createOrderDto.ExpectedDueDate),
            BikeBrand = createOrderDto.BikeBrand,
            Note = createOrderDto.Note
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        var queryOrderDto = new QueryOrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            ServiceType = order.ServiceType.ToString(),
            ExpectedDueDate = order.ExpectedDueDate.ToString("yyyy-MM-dd"),
            BikeBrand = order.BikeBrand,
            Note = order.Note
        };

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, queryOrderDto);
    }

    // PUT: api/Orders/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutOrder(int id, UpdateOrderDto updateOrderDto)
    {
        if (id != updateOrderDto.Id)
        {
            return BadRequest();
        }

        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        order.CustomerId = updateOrderDto.CustomerId;
        order.ServiceType = Enum.Parse<ServiceType>(updateOrderDto.ServiceType);
        order.ExpectedDueDate = DateOnly.Parse(updateOrderDto.ExpectedDueDate);
        order.BikeBrand = updateOrderDto.BikeBrand;
        order.Note = updateOrderDto.Note;

        _context.Entry(order).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Orders/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool OrderExists(int id)
    {
        return _context.Orders.Any(e => e.Id == id);
    }
}
