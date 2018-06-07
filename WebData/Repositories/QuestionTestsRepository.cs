using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories
{
    public class QuestionTestsRepository : Repository<TestQuestion>, ITestQuestionsRepository
    {
        public QuestionTestsRepository(DbContext context) : base(context) { }

        public void Add(int testId, List<int> questionIds)
        {
            List<TestQuestion> testQuestions = new List<TestQuestion>();

            foreach (var questionId in questionIds)
            {
                var test = new TestQuestion
                {
                    QuestionId = questionId,
                    TestId = testId,
                };

                testQuestions.Add(test);
            }

            _context.AddRange(testQuestions);
            _context.SaveChanges();
        }
    }
}
