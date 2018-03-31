
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebData.Data;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories
{
    public class CandidateQuestionsRepository: Repository<CandidateQuestion>, ICandidateQuestionsRepository {

        public CandidateQuestionsRepository(DbContext context) : base(context) { }

        public CandidateQuestion Add(int candidateId, int questionId)
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

        public IEnumerable<CandidateQuestion> Get(bool isDone, int candidateId)
        {
            return _entities
                .Where(cq => cq.CandidateUserId == candidateId && cq.IsDone == isDone)
                .Include(cq => cq.Question);
        }
    }
}