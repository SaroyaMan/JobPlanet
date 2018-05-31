
namespace WebData.Dtos
{
    public class RecommendationNotificationDto
    {
        //public int Id { get; set; }
        public int CandidateId { get; set; }
        public bool? Approved { get; set; }

        public NotificationDto Notification { get; set; }
    }
}