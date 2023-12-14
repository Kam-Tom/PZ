using DB;
using DB.Models;
using Microsoft.AspNetCore.Http;
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
            Files = new List<ProductFile> { CreateProductFiles(request.Files[0], request.FilesDesc.First()) },
            Images = new List<ProductImage> { CreateProductImages(request.Thumbnails[0],true), CreateProductImages(request.Images[0]) }
        };

        _ctx.Products.Add(product);

        _ctx.SaveChanges();
        
    }

    ProductFile CreateProductFiles(IFormFile file,string desc)
    {
        string path = _files.WriteFile(file);
        return new ProductFile()
        {
            Description = desc,
            FilePath = path
        };
    }
    ProductImage CreateProductImages(IFormFile img,bool isThumbnail = false)
    {
        string path = _files.WriteFile(img);
        return new ProductImage()
        {
            IsThumbnail = isThumbnail,
            ImagePath = path
        };
    }

    public void Delete(Product product)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Product> GetByCategory(string name)
    {
        throw new NotImplementedException();
    }

    public Product GetByName(string name)
    {
        throw new NotImplementedException();
    }

    public void Update(Product product)
    {
        throw new NotImplementedException();
    }
}
