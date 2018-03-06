
namespace WebService.Auth.Models
{
    public class Candidate
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }  // navigation property
        public string Gender { get; set; }
    }
}
