using System;

namespace WebData.Dtos
{
    public class NotificationDto
    {
        //public int Id { get; set; }
        public int Type { get; set; }
        public DateTime DateCreated { get; set; }
        //public string Recipent { get; set; }
        public bool IsViewed { get; set; }
    }
}