using efBike.Classes;
using Microsoft.EntityFrameworkCore;

namespace efBike;

public class BikeDbContext 
{
  public DbSet<Customer> Customers { get; set; }
  public DbSet<Order> Orders { get; set; }
  public DbSet<ServiceType> ServiceTypes { get; set; }

  protected override void OnConfigure(DbContextOptionBuilder optionBuilder)
  {
    optionsBuilder.UseSqlServer("TODO");
  }
}