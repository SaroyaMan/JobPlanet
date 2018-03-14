using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebService.Auth;
using WebService.Auth.Models;
using WebService.Helpers;
using Newtonsoft.Json;
using System.Security.Claims;
using AutoMapper;
using System;
using WebData.IdentityModels.ViewModels;
using WebData.IdentityModels;
using WebData;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;

        public AuthController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions
            ,IMapper mapper, ApplicationDbContext appDbContext) {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _mapper = mapper;
            _appDbContext = appDbContext;

        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] CredentialsViewModel credentials) {


            // This one is working
            //_appDbContext.Skills.Add(new WebData.Data.Skill() { CreatedBy = "Yoav", DateCreated = "BLA", Name = "ROB" });
            //_appDbContext.SaveChanges();

            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if(identity == null) {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password) {
            if(string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if(userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if(await _userManager.CheckPasswordAsync(userToVerify, password)) {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }

        //Register
        [HttpPost("registerCandidate")]
        public async Task<IActionResult> Register([FromBody] RegistrationViewModel model) {

            try {
                if(!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }

                var userIdentity = _mapper.Map<AppUser>(model);

                var result = await _userManager.CreateAsync(userIdentity, model.Password);

                if(!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

                await _appDbContext.Candidates.AddAsync(new CandidateUser { IdentityId = userIdentity.Id, ResumeUrl = model.ResumeUrl });
                await _appDbContext.SaveChangesAsync();

                return new OkResult();
            }

            catch(Exception e) {
                return BadRequest(e);
            }

        }
    }
}