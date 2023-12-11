using DB;
using DB.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("categories")]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CategoryController(ApplicationDbContext context) { _context = context; }

        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetAll()
        {
            var categories = _context.Categories.ToList();

            return Ok(categories);
        }

        [HttpPost]
        public ActionResult Post(string name)
        {
            Category category = new Category
            {
                Name = name,
            };

            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }
    }
}
