
using System.Collections.Generic;
using WebData.Data;
using WebData.Dtos;

namespace WebData.Repositories.Interfaces
{
    public interface ICandidateQuestionsRepository: IRepository<CandidateQuestion>
    {
        CandidateQuestion Add(int candidateId, int questionId);

        IEnumerable<CandidateQuestion> Get(bool isDone, int candidateId);
    }
}
