using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Dtos;
using WebData.Repositories.Interfaces;
using System.Linq;
using AutoMapper;
using WebData.IdentityModels;

namespace WebData.Repositories
{
    public class RecommendationNotificationsRepository: Repository<RecommendationNotification>, IRecommendationNotificationsRepository
    {
        public RecommendationNotificationsRepository(DbContext context) : base(context)
        {
        }

        public RecommendationNotificationDto GetRecommendationNotification(int notificationId)
        {
            var recommendationResult = _entities.SingleOrDefault(rc => rc.Notification.Id == notificationId);

            var resultDto = Mapper.Map<RecommendationNotificationDto>(recommendationResult);

            var candidateUser = _context.Set<CandidateUser>().SingleOrDefault(c => c.Id == resultDto.CandidateId);

            if(candidateUser != null)
            {
                var relevantUser = _context.Set<AppUser>().SingleOrDefault(au => au.Id == candidateUser.IdentityId);
                resultDto.CandidateFirstName = relevantUser.FirstName;
                resultDto.CandidateLastName = relevantUser.LastName;
            }



            return resultDto;
        }
    }
}