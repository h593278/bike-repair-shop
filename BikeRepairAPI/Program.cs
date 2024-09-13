using Microsoft.EntityFrameworkCore;
using BikeRepairAPI;

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
    //Local
    // options.UseSqlServer("Server=db,1433;Database=DB;User Id=sa;Password=OEFei394fnrfnr3490t!foefk;TrustServerCertificate=True;"));
    //Azure
    options.UseSqlServer("Server=tcp:bikedbserver.database.windows.net,1433;Initial Catalog=bikerepairdb;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Authentication='Active Directory Default'"));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
