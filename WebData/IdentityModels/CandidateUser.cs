
namespace WebData.IdentityModels
{

    public class CandidateUser
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }  // navigation property
        public string ResumeUrl { get; set; }
    }
}