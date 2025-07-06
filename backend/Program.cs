using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var connectionString = Environment.GetEnvironmentVariable("ICECREAM_DB");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new Exception("Database connection string not set.");
}

builder.Services.AddDbContext<IceCreamDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/products", async (IceCreamDbContext db) =>
{
    var products = await db.Products.ToListAsync();
    return Results.Ok(products);
});

app.Run();
