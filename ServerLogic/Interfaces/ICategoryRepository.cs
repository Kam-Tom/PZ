using DB.Models;
using ServerLogic.DTOs.Category;

namespace ServerLogic.Interfaces;
public interface ICategoryRepository
{
    Category? GetByName(string name, bool includeSubcategories = false);
    void Update(Category category, IEnumerable<string> subcategorieNames);
    Category Create(string name);
    void Delete(Category category);
    ICollection<GetCategoryDto> GetAll();

}
