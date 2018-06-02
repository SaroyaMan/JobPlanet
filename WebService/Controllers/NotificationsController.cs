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
                myNotifications = new NotificationsRepository(_appDbContext)
                    .GetUserNotifications(_clientData.Id);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error getting notifications");
            }

            return myNotifications;
        }

        [HttpGet("getRecommendationNotification/{notificationId}")]
        public RecommendationNotificationDto GetRecommendationNotification(int notificationId)
        {
            RecommendationNotificationDto result = null;

            try
            {
                result = new RecommendationNotificationsRepository(_appDbContext).GetRecommendationNotification(notificationId);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error getting  recommendation notification");
            }
            return result;
        }
    }
}