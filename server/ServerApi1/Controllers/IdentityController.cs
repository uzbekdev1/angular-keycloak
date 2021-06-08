using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using ServerApi1.Services;

namespace ServerApi1.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class IdentityController : ControllerBase
    {
        private readonly ILogger<GreeterService> _logger;

        public IdentityController(ILogger<GreeterService> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Info()
        {

            _logger.LogInformation($"User {User.FindFirstValue("name")}");

            return Ok();
        }

    }
}
