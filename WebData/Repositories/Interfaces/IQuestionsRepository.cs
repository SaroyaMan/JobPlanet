using System.Collections.Generic;
using WebData.Data;
using WebData.HelperModels;

namespace WebData.Repositories.Interfaces
{
    public interface IQuestionsRepository: IRepository<Question>
    {

        IEnumerable<Question> GetQuestionsByQuery(SearchQuestionsQuery query);
    }
}
