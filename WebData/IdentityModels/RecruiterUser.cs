
namespace WebData.IdentityModels
{

    public class RecruiterUser
    {
        public int Id { get; set; }
        public bool ReceiveNotifications { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }  // navigation property
    }
}