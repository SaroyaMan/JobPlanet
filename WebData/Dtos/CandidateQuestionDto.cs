
namespace WebData.Dtos
{
    public class CandidateQuestionDto
    {
        public int QuestionId { get; set; }
        public int CandidateUserId { get; set; }
        public bool IsDone { get; set; }

        public QuestionDto Question { get; set; }
    }
}
