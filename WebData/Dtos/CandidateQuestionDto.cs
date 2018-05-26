
using System;

namespace WebData.Dtos
{
    public class CandidateQuestionDto
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int CandidateUserId { get; set; }
        public bool IsDone { get; set; }
        public string Solution { get; set; }
        public Nullable<System.DateTime> SolutionDate { get; set; }
        public Nullable<double> Ranked { get; set; }
        public string Review { get; set; }
        public QuestionDto Question { get; set; }
    }
}
