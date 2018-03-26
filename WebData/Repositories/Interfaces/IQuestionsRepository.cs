using System.Collections.Generic;
using WebData.Data;
using WebData.Dtos;
using WebData.HelperModels;
using WebData.IdentityModels;

namespace WebData.Repositories.Interfaces
{
    public interface IQuestionsRepository: IRepository<Question>
    {

        IEnumerable<Question> GetQuestionsByQuery(SearchQuestionsQuery query);
        Question SaveOrUpdateQuestion(QuestionDto questionToSave, AppUser user);
        IEnumerable<QuestionDto> IncludeSkills(IEnumerable<QuestionDto> questionDtos);
    }
}
