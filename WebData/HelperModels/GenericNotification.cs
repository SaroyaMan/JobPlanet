using System;

namespace WebData.HelperModels
{
    public class GenericNotification
    {
        public int NotificationId { get; set; }
        public int Type { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsViewed { get; set; }

        public int? CandidateId { get; set; }
        public bool? Approved { get; set; }
    }
}