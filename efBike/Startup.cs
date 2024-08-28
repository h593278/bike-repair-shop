// // using efBike.Classes; // Namespace where your DbContext is defined
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;

// namespace efBike;

// public class Startup
// {
//     public void ConfigureServices(IServiceCollection services)
//     {
//         // Register your DbContext with the connection string from appsettings.json
//         services.AddDbContext<BikeShopContext>(options =>
//             options.UseSqlServer(Configuration.GetConnectionString("BikeShopDatabase")));
        
//         // Other service configurations...
//     }

//     // Other methods...
// }
