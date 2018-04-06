
namespace WebData.Dtos
{
    public class CandidatePositionDto
    {
        //public int Id { get; set; }
        public int PositionId { get; set; }
        public int CandidateUserId { get; set; }
        public string Comment { get; set; }
        public int Status { get; set; }

        public PositionDto Position { get; set; }
        //public virtual Candidate Candidate { get; set; }
    }
}