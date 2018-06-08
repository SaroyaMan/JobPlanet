using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebData.Dtos
{
    public class TestSolutionQuestionDto
    {
        public int Id { get; set; }
        public int TestSolutionId { get; set; }
        public int QuestionId { get; set; }
        public string Solution { get; set; }
        public string Feedback { get; set; }
        public double? Score { get; set; }

        public QuestionDto Question { get; set; }
    }
}
