using Azure.Core;
using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using ServerLogic.DTOs.Category;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly ApplicationDbContext _ctx;
    public CategoryRepository(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }

    public Category Create(string name)
    {
        Category category = new Category() { Name = name };
        _ctx.Categories.Add(category);
        _ctx.SaveChanges();
        return category;
    }
    public void Update(Category category, IEnumerable<string> subcategoryNames)
    {

        var existingSubcategories = _ctx.Categories.Where(c => subcategoryNames.Contains(c.Name)).ToList();

        foreach (var name in subcategoryNames)
        {
            Category? subcategory = existingSubcategories.FirstOrDefault(c => c.Name == name);
            if (subcategory == null)
                subcategory = new Category() { Name = name };
            if (subcategory.ParentCategory == category)
                subcategory.ParentCategory = category;
            else
                category.Subcategories.Add(subcategory);
        }

        _ctx.SaveChanges();
    }
    public Category? GetByName(string name, bool includeSubcategories = false)
    {
        if (!includeSubcategories)
            return _ctx.Categories.FirstOrDefault(c => c.Name == name);
        else
            return _ctx.Categories
               .Include(c => c.Subcategories)
               .FirstOrDefault(c => c.Name == name);
    }

    public void Delete(Category category)
    {
        _ctx.Remove(category);
        _ctx.SaveChanges();
    }

    public ICollection<GetCategoryDto> GetAll()
    {
        var categories = _ctx.Categories
            .Include(c => c.Subcategories)
            .ToList();

        var categoryDtos = categories.Where(p => p.ParentCategoryId == null).Select(c => MapCategoryToDto(c)).ToList();

        return categoryDtos;
    }
    public ICollection<GetCategoryDto> GetList()
    {
        var categories = _ctx.Categories
            .ToList();

        return categories.Select(c => new GetCategoryDto()
        {
            Name = c.Name,
            Id = c.Id
        }).ToList();

    }
    private GetCategoryDto MapCategoryToDto(Category category)
    {
        var Id = category.Id;
        var Name = category.Name;
        var subcategies = category.Subcategories?.Select(subcategory => MapCategoryToDto(subcategory)).ToList();
        var categoryDto = new GetCategoryDto
        {
            Id = Id,
            Name = Name,
            Subcategories = subcategies
        };

        return categoryDto;
    }


}
