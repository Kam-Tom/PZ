using DB;
using DB.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.Category;
using ServerLogic.Interfaces;

namespace API.Controllers;

[Route("categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _repo;
    public CategoryController(ICategoryRepository repo) { _repo = repo; }

    [HttpPost,Authorize(Roles = "Admin")]
    public ActionResult Post(AddCategoryDto request)
    {
        Category? existingCategory = _repo.GetByName(request.Name, false);
        if (existingCategory != null)
            return Conflict("Category already exists");
        Category newCategory = _repo.Create(request.Name);
        if(request.Subcategories != null)
            _repo.Update(newCategory,request.Subcategories);
        return Ok("Category created");
    }

    [HttpDelete,Authorize(Roles = "Admin")]
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
    [HttpGet("List")]
    public ActionResult GetList()
    {
        return Ok(_repo.GetList());
    }

}
