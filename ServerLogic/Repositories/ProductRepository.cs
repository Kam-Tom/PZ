using DB;
using DB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ServerLogic.DTOs.Category;
using ServerLogic.DTOs.Product;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _ctx;
    private readonly FileService _files;
    public ProductRepository(ApplicationDbContext ctx,FileService files)
    {
        _ctx = ctx;
        _files = files;
    }
    public void Add(AddProductDto request)
    {

        Product product = new Product()
        {
            Name = request.Name,
            VAT = request.VAT,
            Stock = request.Stock,
            CategoryId = request.CategoryId,
            Description = request.Description,
            Hidden = request.Hidden,
            Price = request.Price,
        };

        var files = new List<ProductFile>();
        if(request.Files != null)
            for(int i = 0; i < request.Files.Count; i++)
            {
                files.Add(CreateProductFiles(request.Files[i], request.FilesDesc[i]));
            }
        var images = new List<ProductImage>();
        if(request.Thumbnails != null)
            for (int i = 0; i < request.Thumbnails.Count; i++)
            {
                images.Add(CreateProductImages(request.Thumbnails[i], true));
            }
        if(request.Images != null)
            for (int i = 0; i < request.Images.Count; i++)
            {
                images.Add(CreateProductImages(request.Images[i]));
            }

        product.Images = images;
        product.Files = files;

        _ctx.Products.Add(product);

        _ctx.SaveChanges();
        
    }

    ProductFile CreateProductFiles(IFormFile file,string desc)
    {
        string path = _files.Write(file);
        return new ProductFile()
        {
            Description = desc,
            FilePath = path
        };
    }
    ProductImage CreateProductImages(IFormFile img,bool isThumbnail = false)
    {
        string path = _files.Write(img);
        return new ProductImage()
        {
            IsThumbnail = isThumbnail,
            ImagePath = path
        };
    }

    public void Delete(Product product)
    {
        _ctx.Products.Remove(product);
        _ctx.SaveChanges();
    }

    public IEnumerable<Product> GetAll()
    {
        return _ctx.Products.ToList();
    }

    public IEnumerable<Product> GetByCategory(int categoryId)
    {
        return _ctx.Products.Where(p => p.CategoryId == categoryId);
    }
    public IEnumerable<ProductMinatureDto> GetMinaturesByCategory(int categoryId)
    {
        var products = _ctx.Products.Where(p => p.CategoryId == categoryId).Include(p => p.Images).ToList();

        var productDtos = products.Select(p =>
        {
            return new ProductMinatureDto()
            {
                Id = p.Id,
                Name = p.Name,
                Stock = p.Stock,
                Price = p.Price,
                ThumbnailUrl = p.Images.Where(i => i.IsThumbnail).FirstOrDefault().ImagePath
            };
        }).ToList();

        return productDtos;
    }


    public ProductDetailsDto GetDetails(Product product)
    {

        var productDto = new ProductDetailsDto()
        {
            Id = product.Id,
            Stock = product.Stock,
            Description = product.Description,
            Name = product.Name,
            Price = product.Price,
        };

        if(product.Images != null)
            productDto.ImageUrls = product.Images.Where(i => !i.IsThumbnail).Select(i => i.ImagePath);

        if (product.Files != null)
        { 
            productDto.FileUrls = product.Files.Select(f => f.FilePath);
            productDto.FileDescs = product.Files.Select(f => f.Description);
        }

        return productDto;
    }

    public Product? GetByName(string name)
    {
        return _ctx.Products.Where(p => p.Name == name).FirstOrDefault();
    }

    public Product? GetById(int id, bool include = false)
    {
        if(!include)
            return _ctx.Products.Where(p => p.Id == id).FirstOrDefault();
        else
            return _ctx.Products.Where(p => p.Id == id)
                .Include(p=>p.Images)
                .Include(p=>p.Files)
                .Include(p=>p.Reviews)
                .Include(p=>p.Promotions)
                .FirstOrDefault();
    }


}
