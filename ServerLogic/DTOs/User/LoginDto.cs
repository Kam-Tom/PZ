using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs.User;

public record LoginDto([EmailAddress(ErrorMessage = "Not a valid email")] string Email, string Password);
