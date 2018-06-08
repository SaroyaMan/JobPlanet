using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Dtos;
using WebData.Repositories.Interfaces;
using System.Linq;
using AutoMapper;
using WebData.IdentityModels;
using WebData.ConstValues;
using System;

namespace WebData.Repositories
{
    public class RecommendationNotificationsRepository: Repository<RecommendationNotification>, IRecommendationNotificationsRepository
    {
        public RecommendationNotificationsRepository(DbContext context) : base(context)
        {
        }

        public RecommendationNotificationDto GetRecommendationNotification(int notificationId)
        {

            RecommendationNotificationDto resultDto = null;
            var recommendationResults = _entities.Where(rc => rc.Notification.Id == notificationId)
                .Include(rc => rc.Notification);

            if(recommendationResults != null && recommendationResults.Count() > 0)
            {
                var recommendationResult = recommendationResults.First();

                // Update the notification
                recommendationResult.Notification.IsViewed = true;
                _context.SaveChanges();

                resultDto = Mapper.Map<RecommendationNotificationDto>(recommendationResult);

                var candidates = _context.Set<CandidateUser>().Where(c => c.Id == resultDto.CandidateId)
                    .Include(c => c.Identity);

                if(candidates != null && candidates.Count() > 0)
                {
                    var relevantUser = candidates.First();
                    resultDto.CandidateFirstName = relevantUser.Identity.FirstName;
                    resultDto.CandidateLastName = relevantUser.Identity.LastName;
                }

            }
            return resultDto;
        }

        public RecommendationNotificationDto UpdateFeedback(int notificationId, bool isApproved)
        {
            RecommendationNotificationDto result = null;
            var recommendations = Find(rn => rn.Notification.Id == notificationId);
            var updatedRecommendation = recommendations.First();
            if(updatedRecommendation != null)
            {
                updatedRecommendation.Approved = isApproved;
                updatedRecommendation.DateResponded = DateTime.Now;

                _context.Set<Position>();
                new PositionsRepository(_context)
                    .AddCandidateToPotentials(
                    updatedRecommendation.PositionId,
                    updatedRecommendation.CandidateId,
                    CandidatePositionStatus.Recommended);

                _context.SaveChanges();
                result = Mapper.Map<RecommendationNotificationDto>(updatedRecommendation);
            }
            return result;
        }
    }
}