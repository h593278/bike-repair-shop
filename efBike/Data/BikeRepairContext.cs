using efBike.Models;
using Microsoft.EntityFrameworkCore;

namespace efBike
{
    public class BikeRepairContext : DbContext
    {
        // public BikeDbContext(DbContextOptions<BikeDbContext> options)
        //     : base(options)
        // {}

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost,1433;Database=YourDatabaseName;User Id=sa;Password=OEFei394fnrfnr3490t!foefk;TrustServerCertificate=True;");
                //Docker comand: docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=OEFei394fnrfnr3490t!foefk' -p 1433:1433 --name sql_server_container -d mcr.microsoft.com/mssql/server
            }
        }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);

        //     // Store the enum ServiceType as a string instead of an integer in the database:
        //     modelBuilder.Entity<Order>()
        //         .Property(o => o.ServiceType)
        //         .HasConversion<string>();

        //     // Additional model configurations can go here
        // }
    }
}
