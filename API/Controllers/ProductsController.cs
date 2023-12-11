using Azure.Core;
using DB;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using ServerLogic.DTOs.User;
using ServerLogic.Helpers;
using ServerLogic.Interfaces;
using Swashbuckle.AspNetCore.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("product")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context; ;
        }

        // GET: ProductController
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll()
        {
            HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var products = _context.Products;

            return Ok(products);
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Product>> Get([FromRoute] int id)
        {
            var product = _context
                .Products
                .FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> CreateProduct(int id, String name, String desc, decimal price)
        {
            Product product = new Product
            {
                Id = id,
                Name = name,
                Description = desc,
                Price = price,
                Stock = 1,
                CategoryId = 1,
                VAT = 0,
                Hidden = true,
            };

            _context.Products.Add(product);

            _context.SaveChanges();

            return Ok("Product created");
        }

    }
}
