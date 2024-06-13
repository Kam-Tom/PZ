using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class VatController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public VatController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public class VatRates
    {
        public List<Rate> Rates { get; set; }
        public string Disclaimer { get; set; }

        public class Rate
        {
            public string Name { get; set; }
            public List<int> Rates { get; set; } = new List<int>();
        }

    }

    public class TransformedRate
    {
        public string Name;
        public int Rate;
    }
    [HttpGet]
    public async Task<IActionResult> GetVatRates()
    {
        string apiUrl = "https://api.vatlookup.eu/rates/pl";

        HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);
        if (response.IsSuccessStatusCode)
        {
            string inJson = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<VatRates>(inJson);

            if(data == null || data.Rates == null)
            {
                return BadRequest("No data");
            }

            var rates = new List<TransformedRate>();

            foreach (var rate in data.Rates)
            {
                if (rate.Rates != null && rate.Rates.Count > 1)
                {
                    foreach (var value in rate.Rates)
                    {
                        rates.Add(new TransformedRate
                        {
                            Name = rate.Name + " " + value,
                            Rate = value
                        });
                    }
                }
                else if(rate.Rates != null)
                {
                    rates.Add(new TransformedRate
                    {
                        Name = rate.Name,
                        Rate = rate.Rates.Count != 0 ? rate.Rates[0] : -100
                    });
                }


            }
            var outJson = JsonConvert.SerializeObject(rates);
            return Ok(outJson);
        }
        else
        {
            return StatusCode((int)response.StatusCode);
        }
    }
}
