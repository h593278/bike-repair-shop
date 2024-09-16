using Microsoft.EntityFrameworkCore;
using BikeRepairAPI;
using Azure.Identity;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to listen on all available network interfaces
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5275); // Replace with your actual port
});

// use Server=localhost when running in console
// use Server=db when running in docker
// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
{   // Local
    //var connectionString = "Server=db,1433;Database=DB;User Id=sa;Password=OEFei394fnrfnr3490t!foefk;TrustServerCertificate=True;";
    var connectionString = "Server=tcp:bikedbserver.database.windows.net,1433;Initial Catalog=BikeRepairDb;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
    
    // Set up Azure AD Authentication
    var tokenCredential = new DefaultAzureCredential();
    var sqlConnection = new SqlConnection(connectionString)
    {
        AccessToken = tokenCredential.GetToken(
            new Azure.Core.TokenRequestContext(
                new[] { "https://database.windows.net/.default" })).Token
    };

    options.UseSqlServer(sqlConnection);
});

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()    // Allow all origins (any domain can access the API)
                   .AllowAnyMethod()    // Allow all HTTP methods (GET, POST, PUT, etc.)
                   .AllowAnyHeader();   // Allow all headers (content-type, authorization, etc.)
        });
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }

// Apply CORS before any other middleware (like Authorization)
app.UseCors("AllowAllOrigins");

// app.UseHttpsRedirection(); // Uncomment this if you're using HTTPS

app.UseAuthorization();

app.MapControllers();

app.Run();
