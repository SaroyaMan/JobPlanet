using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories
{
    public class NotificationsRepository: Repository<Notification>, INotificationsRepository
    {
        public NotificationsRepository(DbContext context) : base(context)
        {
        }
    }
}