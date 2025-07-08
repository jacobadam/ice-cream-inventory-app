using System;
using System.Linq;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new IceCreamDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<IceCreamDbContext>>());

            if (context.Products.Any())
                return;

            context.Products.AddRange(
                new Product { Name = "Vanilla Bean", Flavor = "Vanilla", Price = 3.50M, Stock = 100, Sold = 25 },
                new Product { Name = "Chocolate Fudge", Flavor = "Chocolate", Price = 4.00M, Stock = 80, Sold = 40 },
                new Product { Name = "Strawberry Swirl", Flavor = "Strawberry", Price = 3.75M, Stock = 60, Sold = 30 },
                new Product { Name = "Mint Chip", Flavor = "Mint", Price = 3.85M, Stock = 50, Sold = 15 }
            );

            context.SaveChanges();
        }
    }
}
