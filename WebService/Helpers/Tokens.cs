using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebService.Auth;
using WebService.Auth.Models;

namespace WebService.Helpers
{
    public class Tokens
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new TokenData()
            {
                Id = identity.Claims.Single(c => c.Type == "id").Value,
                Auth_Token = await jwtFactory.GenerateEncodedToken(userName, identity),
                Expires_In = (int) jwtOptions.ValidFor.TotalSeconds,
            };

            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }

    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class TokenData
    {
        public string Id { get; set; }
        public string Auth_Token { get; set; }
        public int Expires_In { get; set; }
    }
}
