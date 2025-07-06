using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Flavor { get; set; } = string.Empty;

    [Range(0.0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int Stock { get; set; }

    [Range(0, int.MaxValue)]
    public int Sold { get; set; }
}
