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
        IEnumerable<QuestionDto> GetQuestionsForTest(CreateTestQuery query, string userId);
        QuestionDto SaveOrUpdateQuestion(QuestionDto questionToSave, AppUser user);
        IEnumerable<QuestionDto> IncludeSkills(IEnumerable<QuestionDto> questionDtos);
        void IncrementSolvedCount(int questionId);
        void UpdateRank(int questionId, double rank);
    }
}