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
using WebData.ConstValues;

namespace WebData.Repositories
{
    public class QuestionsRepository: Repository<Question>, IQuestionsRepository
    {

        public QuestionsRepository(DbContext context) : base(context) { }

        public IEnumerable<QuestionDto> GetQuestionsByQuery(SearchQuestionsQuery query, AppUser user)
        {
            IEnumerable<Question> questions = _entities.Where(q =>
                    (query.Title != null && query.Title.Length > 0 ? q.Title.Contains(query.Title) : true)
                    && (query.MinRank != null ? q.Rank >= query.MinRank : true)
                    && (query.MaxRank != null ? q.Rank <= query.MaxRank : true))
                    .Include(q => q.CandidateQuestions);

            if(query.SkillIds != null && query.SkillIds.Count > 0)
            {
                questions = questions.Where(q =>
                        (Utils.ConvertStringIdsToList(q.TestedSkills)).
                        Join(query.SkillIds, qSid => qSid, sId => sId, (qSid, sId) => sId).Count() > 0);

            }

            var results = Mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(questions);

            var questionsState = new List<QuestionState>();

            foreach (var q in questions)
            {
                var candidateQuestion = q.CandidateQuestions.FirstOrDefault(cq => cq.CandidateUserId == user.ChildId);

                if (q.CreatedBy == user.Id)
                {
                    questionsState.Add(QuestionState.PublishedByMe);
                }
                else if(candidateQuestion != null)
                {
                    if (candidateQuestion.IsDone)
                        questionsState.Add(QuestionState.InMyDoneList);
                    else
                        questionsState.Add(QuestionState.InMyTodoList);
                }
                else
                {
                    questionsState.Add(QuestionState.General);
                }
            }

            int i = 0;
            foreach (var q in results)
            {
                q.QuestionState = (int)questionsState[i++];
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

        public IEnumerable<QuestionDto> IncludeSkills(IEnumerable<QuestionDto> questionDtos)
        {
            var skills = new SkillsRepository(_context).GetAll();
            var skillDtos = Mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(skills);
            foreach(QuestionDto q in questionDtos)
            {
                var ids = Utils.ConvertStringIdsToList(q.TestedSkills);
                var relevantSkills = 
                q.Skills = skillDtos.Join(ids, s => s.Id, id => id, (s, id) => s);
            }
            return questionDtos;
        }
    }
}