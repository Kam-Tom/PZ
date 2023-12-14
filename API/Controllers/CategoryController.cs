using DB;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.Category;
using ServerLogic.Interfaces;

namespace API.Controllers;

[Route("categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _repo;
    public CategoryController(ICategoryRepository repo) { _repo = repo; }

    [HttpPut]
    public ActionResult Put(AddCategoryDto request)
    {
        Category? category = _repo.GetByName(request.Name,true);
        if (category == null)
            category = _repo.Create(request.Name);

        if(request.Subcategories != null)
            _repo.Update(category,request.Subcategories);

        return Ok("Category updated");
    }

    [HttpDelete]
    public ActionResult Delete(string name)
    {
        Category? category = _repo.GetByName(name,true);
        if (category == null)
            return BadRequest("Category doesn't exist");
        _repo.Delete(category);

        return Ok("Category deleted");
    }

    [HttpGet]
    public ActionResult Get() 
    {
        var categories = _repo.GetAll();

        
        return Ok(categories.ToArray());
    }

}
