
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories
{
    public class CandidateQuestionsRepository: Repository<CandidateQuestion>, ICandidateQuestionsRepository {

        public CandidateQuestionsRepository(DbContext context) : base(context) { }

        public CandidateQuestion AddToTodoList(int candidateId, int questionId)
        {
            CandidateQuestion question = new CandidateQuestion
            {
                QuestionId = questionId,
                CandidateUserId = candidateId,
                IsDone = false
            };

            _context.Add(question);

            _context.SaveChanges();

            return question;
        }
    }
}