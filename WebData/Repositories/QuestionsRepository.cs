using System;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;
using WebData.HelperModels;
using System.Collections.Generic;
using System.Linq;
using WebData.Dtos;
using WebData.IdentityModels;
using AutoMapper;

namespace WebData.Repositories
{
    public class QuestionsRepository: Repository<Question>, IQuestionsRepository
    {

        public QuestionsRepository(DbContext context) : base(context) { }

        public IEnumerable<Question> GetQuestionsByQuery(SearchQuestionsQuery query)
        {

            IEnumerable<Question> results = base.Find(q =>
           (query.Title != null && query.Title.Length > 0 ? q.Title.Contains(query.Title) : true)
           && (query.MinRank != null ? q.Rank >= query.MinRank : true)
           && (query.MaxRank != null ? q.Rank <= query.MaxRank : true));

            if(query.SkillIds != null && query.SkillIds.Count > 0)
            {
                results = results.Where(q =>
                        (Utils.ConvertStringIdsToList(q.TestedSkills)).
                        Join(query.SkillIds, qSid => qSid, sId => sId, (qSid, sId) => sId).Count() > 0);

            }
            return results;
        }

        public Question SaveOrUpdateQuestion(QuestionDto questionToSave, AppUser user)
        {

            questionToSave.LastUpdateDate = questionToSave.DateCreated = DateTime.Now;
            questionToSave.LastUpdateByDisplayName =
                questionToSave.CreatedByDisplayName = Utils.FormatFullName(user.FirstName, user.LastName);

            Question question = Mapper.Map<QuestionDto, Question>(questionToSave);

            // Initialize properties which are not in the dto
            question.CreatedBy = question.LastUpdateBy = user.Id;
            question.RankSum = 0;

            // save in db
            new QuestionsRepository(_context).Add(question);
            _context.SaveChanges();
            return question;
        }
    }
}