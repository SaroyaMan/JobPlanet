
using WebData.Data;

namespace WebData.Repositories.Interfaces
{
    public interface ICandidateQuestionsRepository: IRepository<CandidateQuestion>
    {
        CandidateQuestion AddToTodoList(int candidateId, int questionId);
    }
}
