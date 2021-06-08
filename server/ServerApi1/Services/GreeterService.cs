using System.Security.Claims;
using System.Threading.Tasks;
using Grpc.Core;
using GrpcService5;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace ServerApi1.Services
{
    [Authorize]
    public class GreeterService : Greeter.GreeterBase
    {
        private readonly ILogger<GreeterService> _logger;

        public GreeterService(ILogger<GreeterService> logger)
        {
            _logger = logger;
        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            var httpContext = context.GetHttpContext();
            var currentUser = httpContext.User;

            _logger.LogInformation($"User {currentUser.FindFirstValue("name")}");

            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name
            });
        }

    }
}
