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
          CategoryId = request.CategoryId,
          Description = request.Description,
          Netto = request.Netto,
          VatType = request.VatType,
          Quantity = request.Quantity,
          Hidden = request.Hidden
        };


        var files = new List<ProductFile>();
        if (request.Files != null)
        for (int i = 0; i < request.Files.Count; i++)
        {
            files.Add(CreateProductFile(request.Files[i], request.FilesDescription[i]));
        }
        var images = new List<ProductImage>();

        //Add thumbnail at start of list
        images.Add(CreateProductImage(request.Thumbnail, true));

        for (int i = 0; i < request.Images.Count; i++)
        {
            images.Add(CreateProductImage(request.Images[i]));
        }

        product.Images = images;
        product.Files = files;

        _ctx.Products.Add(product);

        _ctx.SaveChanges();

    }

    ProductFile CreateProductFile(IFormFile file, string desc)
    {
        string path = _files.Write(file);
        if(desc == null)
            desc = file.FileName;
        return new ProductFile()
        {
            Description = desc,
            FilePath = path
        };
    }
    ProductImage CreateProductImage(IFormFile img,bool isThumbnail = false)
    {
        string path = _files.Write(img);
        if(isThumbnail)
            path = _files.ResizeImage(path);

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


    public IEnumerable<ProductMinatureDto> GetMinaturesAll()
    {
        var products = _ctx.Products.Include(p => p.Images).Include(p => p.Promotions).Where(p=>p.Hidden == false).ToList();

        var productDtos = products.Select(p =>
        {
            return new ProductMinatureDto()
            {
                Id = p.Id,
                Name = p.Name,
                Quantity = p.Quantity,
                Netto = p.Netto,
                VatType = p.VatType,
                PromotionNetto = p.Promotions.Where(p => (p.Start < DateTime.Now && p.End > DateTime.Now)).OrderByDescending(p => p.Discount).FirstOrDefault()?.Discount,
                ThumbnailUrl = p.Images.Where(i=>i.IsThumbnail == true).FirstOrDefault().ImagePath,
                Category = _ctx.Categories.Where(i => i.Id == p.CategoryId).FirstOrDefault().Name,
            };
        }).ToList();

        return productDtos;
    }


    public ProductDetailsDto GetDetails(Product product)
    {

        var productDto = new ProductDetailsDto()
        {
            Id = product.Id,
            Quantity = product.Quantity,
            Description = product.Description,
            Name = product.Name,
            Netto = product.Netto,
            VatType = product.VatType,
            Category = _ctx.Categories.Where(i => i.Id == product.CategoryId).FirstOrDefault().Name,
            PromotionNetto = product.Promotions.Where(p => (p.Start < DateTime.Now && p.End > DateTime.Now)).OrderByDescending(p => p.Discount).FirstOrDefault()?.Discount,
        };

        if(product.Images != null)
            productDto.ImageUrls = product.Images.Select(i => i.ImagePath);

        if (product.Files != null)
        { 
            productDto.FileUrls = product.Files.Select(f => f.FilePath);
            productDto.FileDescriptions = product.Files.Select(f => f.Description);
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

    public IEnumerable<ProductMinatureDto> GetMinaturesByName(string name)
    {
        var products = _ctx.Products.Where(p => p.Name.Contains(name)).Include(p => p.Images).Include(p => p.Promotions).Where(p => p.Hidden == false).ToList();

        var productDtos = products.Select(p =>
        {
            return new ProductMinatureDto()
            {
                Id = p.Id,
                Name = p.Name,
                Quantity = p.Quantity,
                Netto = p.Netto,
                VatType = p.VatType,
                PromotionNetto = p.Promotions.Where(p => (p.Start < DateTime.Now && p.End > DateTime.Now)).OrderByDescending(p => p.Discount).FirstOrDefault()?.Discount,
                ThumbnailUrl = p.Images.Where(i => i.IsThumbnail == true).FirstOrDefault().ImagePath
            };
        }).ToList();

        return productDtos;
    }

    public IEnumerable<ProductMinatureDto> GetMinaturesByCategory(int categoryId)
    {
        var products = _ctx.Products.Include(p => p.Images).Include(p=>p.Promotions).Where(p => p.Hidden == false).ToList();

        var productDtos = products.Where(p => p.CategoryId == categoryId).Select(p =>
        {
            return new ProductMinatureDto()
            {
                Id = p.Id,
                Name = p.Name,
                Quantity = p.Quantity,
                Netto = p.Netto,
                VatType = p.VatType,
                PromotionNetto = p.Promotions?.Where(p => (p.Start < DateTime.Now && p.End > DateTime.Now)).OrderByDescending(p => p.Discount).FirstOrDefault()?.Discount,
                ThumbnailUrl = p.Images.Where(i => i.IsThumbnail == true).FirstOrDefault().ImagePath
            };
        }).ToList();

        return productDtos;
    }

    public IEnumerable<ProductMinatureDto> GetMinaturesByPromotion(int promotionId)
    {

        var promotion = _ctx.Promotions.Where(p => p.Id == promotionId).Where(p=> (p.Start < DateTime.Now && p.End > DateTime.Now)).Include(p => p.Products).ThenInclude(p => p.Images).OrderByDescending(p => p.Discount).FirstOrDefault();
        if(promotion == null)
            return Enumerable.Empty<ProductMinatureDto>();

        var productDtos = promotion.Products.Where(p=>p.Hidden == false).Select(p =>
        {

            return new ProductMinatureDto()
            {
                Id = p.Id,
                Name = p.Name,
                Quantity = p.Quantity,
                Netto = p.Netto,
                VatType = p.VatType,
                PromotionNetto = promotion.Discount,
                ThumbnailUrl = p.Images.Where(i => i.IsThumbnail == true).FirstOrDefault().ImagePath
            };
        }).ToList();

        return productDtos;
    }

    public IEnumerable<GetProductDto> GetAll()
    {
        var products = _ctx.Products.Include(p => p.Images).Include(p => p.Promotions).ToList();

        var productDtos = products.Select(p =>
        {
            return new GetProductDto()
            {
                Id = p.Id,
                Name = p.Name,
                Quantity = p.Quantity,
                Netto = p.Netto,
                VatType = p.VatType,
                Description = p.Description,
                Hidden = p.Hidden,
                PromotionNetto = p.Promotions.Where(p => (p.Start < DateTime.Now && p.End > DateTime.Now)).OrderByDescending(p => p.Discount).FirstOrDefault()?.Discount,
                Category = _ctx.Categories.Where(i => i.Id == p.CategoryId).FirstOrDefault().Name,
            };
        }).ToList();

        return productDtos;
    }

    public void Update(Product product, UpdateProductDto request)
    {
        var productType = typeof(Product);
        var requestType = typeof(UpdateProductDto);

        foreach (var property in requestType.GetProperties())
        {
            var value = property.GetValue(request);
            if (value != null)
            {
                var productProperty = productType.GetProperty(property.Name);
                if (productProperty != null)
                {
                    productProperty.SetValue(product, value);
                }
            }
        }

        _ctx.SaveChanges();
    }
}
