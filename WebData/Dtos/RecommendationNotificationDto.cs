using System;

namespace WebData.Dtos
{
    public class RecommendationNotificationDto
    {
        public int Id { get; set; }
        public int CandidateId { get; set; }            
        public string CandidateFirstName { get; set; }
        public string CandidateLastName { get; set; }
        public bool? Approved { get; set; }
        public int PositionId { get; set; }
        public DateTime? DateResponded { get; set; }

        public NotificationDto Notification { get; set; }
    }
}