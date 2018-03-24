using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Net;
using System.Text;
using WebService.Auth;
using WebService.Auth.Models;
using WebService.Extensions;
using FluentValidation.AspNetCore;
using WebData.IdentityModels;
using WebData;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Logging;
using WebService.Helpers;

namespace WebService.Init {

    public class Startup
    {
        private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Add framework services.
            //services.AddDbContext<ApplicationDbContext>(options =>
            //    options.UseSqlServer("Server = den1.mssql5.gear.host; Database = jobplanet1; User Id = jobplanet1; Password = Ef2r!168_0hA; MultipleActiveResultSets = true",
            //        b => b.MigrationsAssembly("WebService")));


            services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("WebService")));


            services.AddSingleton<IJwtFactory, JwtFactory>();

            // Register the ConfigurationBuilder instance of FacebookAuthSettings
            //services.Configure<FacebookAuthSettings>(Configuration.GetSection(nameof(FacebookAuthSettings)));

            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();

            // jwt wire up
            // Get options from app settings
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                //options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                //options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.Issuer = "webApi";
                options.Audience = "http://localhost:4200/";
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters {
                ValidateIssuer = true,
                //ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],
                ValidIssuer = "webApi",
                ValidateAudience = true,
                //ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],
                ValidAudience = "http://localhost:4200/",
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            //var tokenValidationParameters = new TokenValidationParameters {
            //    ValidateIssuer = false,
            //    ValidIssuer = "webApi",
            //    ValidateAudience = false,
            //    ValidAudience = "http://localhost:4200/",
            //    ValidateIssuerSigningKey = false,
            //    IssuerSigningKey = _signingKey,

            //    RequireExpirationTime = false,
            //    ValidateLifetime = true,
            //    ClockSkew = TimeSpan.Zero
            //};

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                      config =>
                      {
                          config.AllowAnyOrigin()
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Helpers.Constants.Strings.JwtClaimIdentifiers.Rol, Helpers.Constants.Strings.JwtClaims.ApiAccess));
            });

            // add identity
            var builder = services.AddIdentityCore<AppUser>(o =>
            {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

            services.AddAutoMapper();
            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = "../WebApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddDebug(LogLevel.Warning);
            loggerFactory.AddFile(Configuration.GetSection("Logging"));

            LoggerConfig.ConfigureLogger(loggerFactory);

            if(env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseRequestToken();

            app.UseCors("AllowAllHeaders");

            app.UseExceptionHandler(
                builder => {
                    builder.Run(
                        async context => {
                                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                                var error = context.Features.Get<IExceptionHandlerFeature>();
                                if(error != null) {
                                    context.Response.AddApplicationError(error.Error.Message);
                                    await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                                }
                            });
                });

            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseMvc();

            app.UseSpa(spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                //spa.Options.SourcePath = "ClientApp";
                spa.Options.SourcePath = "../WebApp";

                if(env.IsDevelopment()) {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
