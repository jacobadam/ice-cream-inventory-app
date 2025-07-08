using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()));

builder.Services.AddOpenApi();

var connectionString = Environment.GetEnvironmentVariable("ICECREAM_DB");
if (string.IsNullOrWhiteSpace(connectionString))
    throw new Exception("Database connection string not set.");

builder.Services.AddDbContext<IceCreamDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var logger    = context.RequestServices.GetRequiredService<ILogger<Program>>();
        var feature   = context.Features.Get<IExceptionHandlerFeature>();
        var exception = feature?.Error;

        logger.LogError(exception, "Unhandled exception occurred.");

        if (exception is BadHttpRequestException || exception is DbUpdateException)
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        else
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        context.Response.ContentType = "application/problem+json";

        var problem = new ProblemDetails
        {
            Title = exception switch
            {
                BadHttpRequestException _ => "Bad request.",
                DbUpdateException      _ => "A database error occurred.",
                _                        => "An unexpected error occurred."
            },
            Status = context.Response.StatusCode,
            Detail = app.Environment.IsDevelopment()
                ? exception?.ToString()
                : "An error occurred while processing your request."
        };

        await context.Response.WriteAsJsonAsync(problem);
    });
});

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseCors("AllowAngular");

if (!app.Environment.IsDevelopment())
    app.UseHttpsRedirection();

    
app.MapGet("/api/error", () =>
{
    throw new Exception("Test exception");
});

app.MapGet("/api/products", async (IceCreamDbContext db) =>
    Results.Ok(await db.Products.OrderBy(p => p.Id).ToListAsync()));

app.MapPost("/api/products", async (IceCreamDbContext db, Product product) =>
{
    var results = new List<ValidationResult>();
    var context = new ValidationContext(product);
    if (!Validator.TryValidateObject(product, context, results, true))
    {
        var errors = results
            .GroupBy(r => r.MemberNames.FirstOrDefault() ?? "")
            .ToDictionary(
                g => g.Key,
                g => g.Select(r => r.ErrorMessage ?? "").ToArray()
            );
        return Results.ValidationProblem(errors);
    }

    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Created($"/api/products/{product.Id}", product);
});

app.MapGet("/api/products/{id}", async (int id, IceCreamDbContext db) =>
{
    var product = await db.Products.FindAsync(id);
    return product is not null
        ? Results.Ok(product)
        : Results.NotFound();
});

app.MapPut("/api/products/{id}", async (int id, IceCreamDbContext db, Product updatedProduct) =>
{
    var results = new List<ValidationResult>();
    var context = new ValidationContext(updatedProduct);
if (!Validator.TryValidateObject(updatedProduct, context, results, true))
    {
        var errors = results
            .GroupBy(r => r.MemberNames.FirstOrDefault() ?? "")
            .ToDictionary(
                g => g.Key,
                g => g.Select(r => r.ErrorMessage ?? "").ToArray()
            );
        return Results.ValidationProblem(errors);
    }

    var product = await db.Products.FindAsync(id);
    if (product is null) return Results.NotFound();

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
    if (product is null) return Results.NotFound();

    db.Products.Remove(product);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
