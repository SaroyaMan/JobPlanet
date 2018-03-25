using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using WebData;
using WebData.IdentityModels;
using WebService.Auth;

/*
 * Read more about Middlewares: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?tabs=aspnetcore2x
 */
namespace WebService.Extensions
{
    public class RequestTokenMiddleware
    {

        private readonly RequestDelegate _next;

        public RequestTokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IJwtFactory jwtFactory, UserManager<AppUser> userManager)
        {

            var authHeader = context.Request.Headers["Authorization"];

            if(authHeader.Count == 1)
            {
                // Extract the Token from the Header
                string token = authHeader.ToArray()[0].Split(' ')[1];
                if(!string.IsNullOrWhiteSpace(token))
                {

                    // Another Strategy: Need to decide which one to take
                    //var user = AppUsersHolder.Instance.GetUserByToken(token);

                    string userEmail = jwtFactory.DecodeToken(token).Subject;
                    var user = await userManager.FindByEmailAsync(userEmail);

                    context.Items.Add("AppUser", user);
                }
            }
            await _next.Invoke(context);
        }
    }

    public static class RequestTokenMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestToken(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestTokenMiddleware>();
        }
    }
}
