using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebData;
using WebData.Data;
using WebData.Dtos;
using WebData.HelperModels;
using WebData.Repositories;
using System.Linq;
using WebData.ConstValues;
using WebData.Repositories.Interfaces;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class NotificationsController: BaseController<NotificationsController>
    {

        public NotificationsController(ApplicationDbContext appDbContext, IMapper mapper,
            ILogger<NotificationsController> log, IHttpContextAccessor httpContextAccessor) : base(appDbContext, mapper, log, httpContextAccessor)
        {
        }

        [HttpGet("getNotifications")]
        public IEnumerable<GenericNotification> GetNotifications()
        {
            IEnumerable<GenericNotification> myNotifications = null;

            try
            {
                myNotifications =   
                    from n in _appDbContext.Notifications
                    join r in _appDbContext.RecommendationNotifications
                    on n.Id equals r.Notification.Id
                    where n.Recipent == _clientData.Id
                    select new GenericNotification()
                    {
                        Approved = r.Approved,
                        CandidateId = r.CandidateId,
                        IsViewed = n.IsViewed,
                        DateCreated = n.DateCreated,
                        Type = n.Type
                    };

            }
            catch(Exception e)
            {
                _log.LogError(e, "Error getting notifications");
            }

            return myNotifications;
        }
    }
}