using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using ServerApi1.Filters;

namespace ServerApi1
{
    public class Startup
    {
        private static readonly IWebProxy _proxy = new WebProxy("http://192.168.15.3:8080", true)
        {
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential("e.latipov", "web@1234")
        };

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            if (Environment.IsDevelopment())
            {
                IdentityModelEventSource.ShowPII = true;

                ServicePointManager.ServerCertificateValidationCallback += (a, b, c, d) => true;
                HttpClient.DefaultProxy = _proxy;
            }

            services.AddControllers();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = "http://keycloak.westeurope.azurecontainer.io:8080/auth/realms/2Test";
                    options.Audience = "ui";
                    options.IncludeErrorDetails = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidAudiences = new[] { "master-realm", "account" },
                        ValidateIssuer = true,
                        ValidIssuer = "http://keycloak.westeurope.azurecontainer.io:8080/auth/realms/2Test",
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                }); 
            services.AddAuthorization();
           
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ServerApi1", Version = "v1" });
                c.OperationFilter<AuthOperationFilter>();
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
            });

            services.AddCors(options => options.AddPolicy("AllowAll",builder => builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod().SetIsOriginAllowed(s => true)));

        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ServerApi1 v1");
            });

            app.UseCors("AllowAll");

            app.UseRouting();

            app.UseAuthentication();  
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
