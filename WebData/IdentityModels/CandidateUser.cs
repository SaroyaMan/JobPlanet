
using System.Collections.Generic;
using WebData.Data;

namespace WebData.IdentityModels
{

    public class CandidateUser
    {
        public int Id { get; set; }
        public bool AllowSendResume { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }  // navigation property
        public IEnumerable<CandidateQuestion> Questions { get; set; }
    }
}