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
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebData.ConstValues;
using System.Collections.Generic;
using WebData.Dtos;
using WebData.Data;
using Microsoft.Extensions.Logging;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    public class AuthController: Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ClaimsPrincipal _caller;
        private readonly ApplicationDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly ILogger<AuthController> _log;

        public AuthController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions
            , IMapper mapper, ILogger<AuthController> log, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _mapper = mapper;
            _appDbContext = appDbContext;
            _caller = httpContextAccessor.HttpContext.User;
            _log = log;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] CredentialsViewModel credentials)
        {

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if(identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented, });

            string token = JsonConvert.DeserializeObject<TokenData>(jwt).Auth_Token;
            AppUser user = await _userManager.FindByNameAsync(credentials.UserName);

            AppUsersHolder.Instance.SetAppUser(token, user);

            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if(string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if(userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if(await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }

        //Register
        [HttpPost("registerCandidate")]
        public async Task<IActionResult> RegisterCandidate([FromBody] CandidateRegistrationViewModel model)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userIdentity = _mapper.Map<AppUser>(model);

                var result = await _userManager.CreateAsync(userIdentity, model.Password);

                if(!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

                var candidate = new CandidateUser { IdentityId = userIdentity.Id, ResumeUrl = model.ResumeUrl };
                await _appDbContext.Candidates.AddAsync(candidate);
                await _appDbContext.SaveChangesAsync();
                userIdentity.ChildId = candidate.Id;
                await _userManager.UpdateAsync(userIdentity);
                await _appDbContext.SaveChangesAsync();
                return new OkResult();
            }

            catch(Exception e)
            {
                return BadRequest(e);
            }

        }

        //Register
        [HttpPost("registerRecruiter")]
        public async Task<IActionResult> RegisterRecruiter([FromBody] RecruiterRegistrationViewModel model)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userIdentity = _mapper.Map<AppUser>(model);

                var result = await _userManager.CreateAsync(userIdentity, model.Password);

                if(!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

                var recruiter = new RecruiterUser { IdentityId = userIdentity.Id };
                await _appDbContext.Recruiters.AddAsync(recruiter);
                await _appDbContext.SaveChangesAsync();
                userIdentity.ChildId = recruiter.Id;
                await _userManager.UpdateAsync(userIdentity);
                await _appDbContext.SaveChangesAsync();

                return new OkResult();
            }

            catch(Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(Policy = "ApiUser")]
        [HttpGet("userData")]
        public async Task<IActionResult> UserData()
        {
            // retrieve the user info
            //HttpContext.User
            try
            {
                Claim userId = _caller.Claims.Single(c => c.Type == "id");

                var candidate = await _appDbContext.Candidates.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == userId.Value);
                if(candidate != null)
                {
                    return new OkObjectResult(new
                    {
                        candidate.Identity.FirstName,
                        candidate.Identity.LastName,
                        candidate.Identity.Email,
                        candidate.ResumeUrl,
                        UserType = (int) UserType.Candidate,
                    });
                }
                var recruiter = await _appDbContext.Recruiters.Include(c => c.Identity).SingleAsync(r => r.Identity.Id == userId.Value);
                if(recruiter != null)
                {
                    return new OkObjectResult(new
                    {
                        recruiter.Identity.FirstName,
                        recruiter.Identity.LastName,
                        recruiter.Identity.Email,
                        UserType = (int) UserType.Recruiter,
                    });
                }
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error Getting UserData");   
            }
            return new UnauthorizedResult();
        }
    }
}