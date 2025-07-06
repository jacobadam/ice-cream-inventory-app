using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class IceCreamDbContext : DbContext
{
    public IceCreamDbContext(DbContextOptions<IceCreamDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
}
