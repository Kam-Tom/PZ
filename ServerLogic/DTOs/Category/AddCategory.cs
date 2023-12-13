
using System.ComponentModel.DataAnnotations;

namespace ServerLogic.DTOs.Category;
public record AddCategoryDto([MinLength(3)]string Name, IEnumerable<string>? Subcategories);
