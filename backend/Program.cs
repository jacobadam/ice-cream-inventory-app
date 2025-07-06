using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Linq; 

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
    var products = await db
        .Products
        .OrderBy(p => p.Id)
        .ToListAsync();
    return Results.Ok(products);
});

app.MapPost("/api/products", async (IceCreamDbContext db, Product product) =>
{
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Created($"/api/products/{product.Id}", product);
});

app.MapPut("/api/products/{id}", async (int id, IceCreamDbContext db, Product updatedProduct) =>
{
    var product = await db.Products.FindAsync(id);
    if (product == null) return Results.NotFound();

    product.Name = updatedProduct.Name;
    product.Flavor = updatedProduct.Flavor;
    product.Price = updatedProduct.Price;
    product.Stock = updatedProduct.Stock;
    product.Sold = updatedProduct.Sold;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/api/products/{id}", async (int id, IceCreamDbContext db) =>
{
    var product = await db.Products.FindAsync(id);
    if (product == null) return Results.NotFound();

    db.Products.Remove(product);
    await db.SaveChangesAsync();
    return Results.NoContent();
});


app.Run();
