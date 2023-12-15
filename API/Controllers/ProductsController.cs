using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using ServerLogic.DTOs.Product;
using ServerLogic.Interfaces;



[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _repo;

    public ProductController(IProductRepository repo)
    {
        _repo = repo;
    }

    [HttpPut]
    public ActionResult Add([FromForm] AddProductDto request)
    {
        _repo.Add(request);
        return Ok();
    }

    [HttpGet]
    public ActionResult GetMiniatures(int categoryId)
    {
        return Ok(_repo.GetMinaturesByCategory(categoryId));
    }
    [HttpGet("{id}")]
    public ActionResult<ProductDetailsDto> Get([FromRoute] int id)
    {
        var product = _repo.GetById(id,true);
        if (product == null)
            return BadRequest("Product dont exist");

        var productDto = _repo.GetDetails(product);

        return Ok(productDto);
    }

    [HttpDelete("{id}")]
    public ActionResult Delete([FromRoute] int id) 
    {
        var product = _repo.GetById(id);
        if (product == null)
            return BadRequest("Product dont exist");

        _repo.Delete(product);

        return Ok();
    }
    //[HttpGet("{id}")]
    //public ActionResult<IEnumerable<Product>> Get([FromRoute] int id)
    //{
    //    var product = _context
    //        .Products
    //        .FirstOrDefault(p => p.Id == id);

    //    if (product == null)
    //    {
    //        return NotFound();
    //    }
    //    return Ok(product);
    //}

    //[HttpPost("UploadFile")]
    //public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationToken)
    //{
    //    try
    //    {
    //        var result = await WriteFile(file);
    //        return Ok(result);
    //    }
    //    catch (Exception ex)
    //    {
    //        throw ex;
    //    }

    //}
    //[HttpGet("DownloadFile")]
    //public async Task<IActionResult> DownloadFile(string filename)
    //{
    //    var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);

    //    var provider = new FileExtensionContentTypeProvider();
    //    if(!provider.TryGetContentType(filepath, out var contentType))
    //    {
    //        contentType = "application/octet-stream";
    //    }

    //    var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
    //    return File(bytes, contentType, Path.GetFileName(filepath));

    //}
    //private async Task<string> WriteFile(IFormFile file)
    //{

    //    string filename = "";
    //    try
    //    {
    //        var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
    //        filename = DateTime.Now.Ticks.ToString() + extension;

    //        var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");

    //        if(!Directory.Exists(filepath))
    //        {
    //            Directory.CreateDirectory(filepath);
    //        }

    //        var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);
    //        using(var stream = new FileStream(exactpath,FileMode.Create))
    //        {
    //            await file.CopyToAsync(stream);
    //        }
    //        return filename;
    //    }
    //    catch (Exception ex)
    //    {

    //    return filename;
    //    }
    //}

}
