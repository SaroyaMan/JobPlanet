using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebData.HelperModels
{
    public class GenericNotification
    {
        public int Type { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsViewed { get; set; }


        public int? CandidateId { get; set; }
        public bool? Approved { get; set; }

        //public NotificationDto Notification { get; set; }
    }
}