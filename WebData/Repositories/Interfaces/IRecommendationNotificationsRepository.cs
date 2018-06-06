using WebData.Data;
using WebData.Dtos;

namespace WebData.Repositories.Interfaces
{
    public interface IRecommendationNotificationsRepository: IRepository<RecommendationNotification>
    {
        RecommendationNotificationDto GetRecommendationNotification(int notificationId);
        RecommendationNotificationDto UpdateFeedback(int notificationId, bool isApproved);
    }
}
