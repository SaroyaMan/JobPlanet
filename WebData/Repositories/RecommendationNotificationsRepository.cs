using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories
{
    public class RecommendationNotificationsRepository: Repository<RecommendationNotification>, IRecommendationNotificationsRepository
    {
        public RecommendationNotificationsRepository(DbContext context) : base(context)
        {
        }
    }
}