using System.Collections.Generic;
using WebData.Data;
using WebData.HelperModels;
using WebData.Repositories.Interfaces;
using System.Linq;

namespace WebData.Repositories
{
    public class NotificationsRepository: Repository<Notification>, INotificationsRepository
    {
        private ApplicationDbContext _appDbContext = null;

        public NotificationsRepository(ApplicationDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public IEnumerable<GenericNotification> GetUserNotifications(string userId)
        {
            return from n in _appDbContext.Notifications
                   join r in _appDbContext.RecommendationNotifications
                   on n.Id equals r.Notification.Id
                   where n.Recipent == userId
                   select new GenericNotification()
                   {
                       NotificationId = n.Id,
                       IsViewed = n.IsViewed,
                       DateCreated = n.DateCreated,
                       Type = n.Type,
                       Approved = r.Approved,
                       CandidateId = r.CandidateId,
                   };
        }
    }
}