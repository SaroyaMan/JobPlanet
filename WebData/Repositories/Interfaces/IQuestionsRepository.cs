using System.Collections.Generic;
using WebData.Data;
using WebData.Dtos;
using WebData.HelperModels;
using WebData.IdentityModels;

namespace WebData.Repositories.Interfaces
{
    public interface IQuestionsRepository: IRepository<Question>
    {

        IEnumerable<QuestionDto> GetQuestionsByQuery(SearchQuestionsQuery query, AppUser user);
        Question SaveOrUpdateQuestion(QuestionDto questionToSave, AppUser user);
        IEnumerable<QuestionDto> IncludeSkills(IEnumerable<QuestionDto> questionDtos);
    }
}
