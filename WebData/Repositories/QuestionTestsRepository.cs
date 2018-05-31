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
    public class QuestionTestsRepository : Repository<QuestionTest>, IQuestionTestRepository
    {
        public QuestionTestsRepository(DbContext context) : base(context) { }

        public void Add(int testId, List<int> questionIds)
        {
            List<QuestionTest> testQuestions = new List<QuestionTest>();

            foreach (var questionId in questionIds)
            {
                var test = new QuestionTest
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
