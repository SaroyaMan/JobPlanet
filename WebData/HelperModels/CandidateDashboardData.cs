using System.Collections.Generic;
using WebData.Dtos;

namespace WebData.HelperModels
{
    public class CandidateDashboardData
    {
        public int NumOfQuestions { get; set; }
        public IEnumerable<QuestionDto> TodoListQuestions { get; set; }
        public IEnumerable<QuestionDto> PublishedQuestions { get; set; }
    }
}