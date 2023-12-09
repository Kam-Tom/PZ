using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerLogic.DTOs;

public record LoginDto(string Email, string Password);
public record RegisteDto(string Name, string Surname, string Email, string Password);
