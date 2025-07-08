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
                new Product { Name = "Fudge Fiesta", Flavor = "Chocolate Fudge", Price = 5.99M, Stock = 19, Sold = 52 },
                new Product { Name = "Summer Bliss", Flavor = "Strawberry", Price = 4.89M, Stock = 4, Sold = 43 },
                new Product { Name = "Pure Essence", Flavor = "Vanilla", Price = 4.79M, Stock = 16, Sold = 32 },
                new Product { Name = "Mint Fusion", Flavor = "Mint Chocolate", Price = 5.29M, Stock = 3, Sold = 26 },
                new Product { Name = "Cookie Crumble", Flavor = "Cookie Dough", Price = 4.99M, Stock = 3, Sold = 77 },
                new Product { Name = "Mint Fusion", Flavor = "Mint Chocolate", Price = 4.79M, Stock = 3, Sold = 26 },
                new Product { Name = "Cherry Grove", Flavor = "Cherry", Price = 5.29M, Stock = 8, Sold = 22 },
                new Product { Name = "Salted Pistachio", Flavor = "Pistachio", Price = 5.59M, Stock = 3, Sold = 44 },
                new Product { Name = "Caramel Velvet", Flavor = "Salted Caramel", Price = 4.69M, Stock = 15, Sold = 52 },
                new Product { Name = "Coffee Espresso", Flavor = "Coffee", Price = 5.29M, Stock = 3, Sold = 26 },
                new Product { Name = "Peanut Butter Swirl", Flavor = "Peanut Butter", Price = 5.29M, Stock = 3, Sold = 64 },

            );

            context.SaveChanges();
        }
    }
}
