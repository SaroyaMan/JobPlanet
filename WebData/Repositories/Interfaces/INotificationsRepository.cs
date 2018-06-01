using System.Collections.Generic;
using WebData.Data;
using WebData.HelperModels;

namespace WebData.Repositories.Interfaces
{
    public interface INotificationsRepository: IRepository<Notification>
    {
        IEnumerable<GenericNotification> GetUserNotifications(string userId);
    }
}
