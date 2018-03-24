
using Microsoft.AspNetCore.Mvc;
using WebData;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using WebData.IdentityModels;

namespace WebService.Controllers
{
    public class BaseController<T>: Controller {

        protected readonly ApplicationDbContext _appDbContext;
        protected readonly IMapper _mapper;
        protected readonly ILogger<T> _log;
        //protected readonly UserManager<AppUser> _userManager;

        // When use that field - must check for null
        protected readonly AppUser _clientData;

        public BaseController(ApplicationDbContext appDbContext, IMapper mapper, ILogger<T> log,
            IHttpContextAccessor httpContextAccessor) {
            //_userManager = userManager;
            _appDbContext = appDbContext;
            _mapper = mapper;
            _log = log;

            if(httpContextAccessor.HttpContext.Items["AppUser"] != null) {
                _clientData = httpContextAccessor.HttpContext.Items["AppUser"] as AppUser;
            }
        }
    }
}
