using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebData;
using WebData.Data;
using WebData.Repositories;
using AutoMapper;
using WebData.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Data.Entity;
using WebData.HelperModels;
using WebData.IdentityModels;
using WebData.ConstValues;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class ProfileSettingsController : BaseController<ProfileSettingsController>
    {

        public ProfileSettingsController(ApplicationDbContext appDbContext, IMapper mapper, ILogger<ProfileSettingsController> log,
            IHttpContextAccessor httpContextAccessor) : base(appDbContext, mapper, log, httpContextAccessor) { }

        [HttpPost("updateDetails")]
        public IActionResult UpdateDetails([FromBody] ProfileSettings profile)
        {
            try
            {
                AppUser user = _appDbContext.Set<AppUser>().FirstOrDefault(u => u.Id == _clientData.Id);

                if (user != null)
                {
                    _appDbContext.Attach(user);

                    if(profile.FirstName != user.FirstName)
                    {
                        user.FirstName = profile.FirstName;
                    }
                    if (profile.LastName != user.LastName)
                    {
                        user.LastName = profile.LastName;
                    }

                    if(_clientData.UserType == (int) UserType.Candidate)
                    {
                        if(profile.AllowSendResume != null)
                        {
                            CandidateUser candidate = _appDbContext.Set<CandidateUser>().FirstOrDefault(u => u.Id == _clientData.ChildId);
                            _appDbContext.Attach(candidate);
                            candidate.AllowSendResume = (bool) profile.AllowSendResume;
                        }
                    }

                    else if(_clientData.UserType == (int) UserType.Recruiter)
                    {
                        if(profile.ReceiveNotifications != null)
                        {
                            RecruiterUser recruiter = _appDbContext.Set<RecruiterUser>().FirstOrDefault(u => u.Id == _clientData.ChildId);
                            _appDbContext.Attach(recruiter);
                            recruiter.ReceiveNotifications = (bool) profile.ReceiveNotifications;
                        }
                    }

                    _appDbContext.SaveChanges();

                    return Ok();
                }

                return BadRequest("There was a problem updating details");
            }
            catch (Exception e)
            {
                _log.LogError(e, "Update Details failed");
                return BadRequest(e);
            }
        }
    }
}