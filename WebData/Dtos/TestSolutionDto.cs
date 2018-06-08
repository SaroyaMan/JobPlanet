using System;
using System.Collections.Generic;

namespace WebData.Dtos
{
    public class TestSolutionDto
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool IsMember { get; set; }
        public int TimeInSeconds { get; set; }
        public int? CandidateUserId { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsEvaluated { get; set; }
        public IEnumerable<TestSolutionQuestionDto> TestSolutionQuestions { get; set; }
    }
}