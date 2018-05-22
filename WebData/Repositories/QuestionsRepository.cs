using System;
using System.Numerics;
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
                    q.AccessModifier == (int) AccessModifier.Public
                    && (query.Title != null && query.Title.Length > 0 ? q.Title.Contains(query.Title) : true)
                    && (query.MinRank != null ? q.Rank >= query.MinRank : true)
                    && (query.MaxRank != null ? q.Rank <= query.MaxRank : true))
                    .Include(q => q.CandidateQuestions);

            if (query.SkillIds != null && query.SkillIds.Count > 0)
            {
                questions = questions.Where(q =>
                        (Utils.ConvertStringIdsToList(q.TestedSkills)).
                        Join(query.SkillIds, qSid => qSid, sId => sId, (qSid, sId) => sId).Count() > 0);

            }

            var questionDtos = Mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(questions);

            ComputeQuestionsState(user, questions, questionDtos);

            return questionDtos;
        }

        public IEnumerable<QuestionDto> GetQuestionsForTest(CreateTestQuery query, string userId)
        {
            // Get all public questions 
            IEnumerable<Question> publicQuestions = _entities.Where(q => q.AccessModifier == (int)AccessModifier.Public);

            // Filter questions with at least one skill from the query skills
            List<Question> questions = publicQuestions.Where(q =>
                    (Utils.ConvertStringIdsToList(q.TestedSkills))
                    .Join(query.SkillIds, qSid => qSid, sId => sId, (qSid, sId) => sId)
                    .Count() > 0).ToList();

            List<QuestionDto> questionDtos = Mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(questions).ToList();

            // Create the Mathcing Vector of the query
            int matchingVectorLength = (int)MatchingVectorIndex.StartOfSkills + new SkillsRepository(_context).Count();
            double[] queryMatchingVector = new double[matchingVectorLength];

            queryMatchingVector = BuildMatchingVector
                (
                    queryMatchingVector,
                    query.DifficultyLevel, 
                    query.SkillIds
                );

            double[] questionMatchingVector = new double[matchingVectorLength];
            for (int i = 0; i < questionDtos.Count; i++)
            {
                // Create the Mathcing Vector of the question
                Array.Clear(questionMatchingVector, 0, questionMatchingVector.Length);
                questionMatchingVector = BuildMatchingVector
                    (
                        questionMatchingVector,
                        questions[i].Rank, 
                        Utils.ConvertStringIdsToList(questions[i].TestedSkills)
                    );

                // Calculate vectors distance
                double sum = 0;
                for (int j = 0; j < queryMatchingVector.Length; j++)
                {
                    sum += Math.Pow(questionMatchingVector[j] - queryMatchingVector[j], 2);
                }
                questionDtos[i].MatchingDistance = Math.Sqrt(sum);
            }

            // Return results ordered by distance
            return questionDtos.OrderBy(q => q.MatchingDistance);
        }

        private double[] BuildMatchingVector(double[] matchingVector, double difficultyLevel, List<int> skillIds)
        {
            matchingVector[(int)MatchingVectorIndex.DifficultyLevel] = difficultyLevel;

            foreach (var skill in skillIds)
            {
                int index = (int)MatchingVectorIndex.StartOfSkills + skill - 1; // -1 as Skills Id start at 1, not 0
                matchingVector[index] = 1;
            }

            return matchingVector;
        }

        private static void ComputeQuestionsState(AppUser user, IEnumerable<Question> questions, IEnumerable<QuestionDto> questionDtos)
        {
            var questionsState = new List<QuestionState>();

            foreach (var q in questions)
            {
                var candidateQuestion = q.CandidateQuestions.FirstOrDefault(cq => cq.CandidateUserId == user.ChildId);

                if (q.CreatedBy == user.Id)
                {
                    questionsState.Add(QuestionState.PublishedByMe);
                }
                else if (candidateQuestion != null)
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
            foreach (var q in questionDtos)
            {
                q.QuestionState = (int)questionsState[i++];
            }
        }

        public QuestionDto SaveOrUpdateQuestion(QuestionDto questionToSave, AppUser user)
        {

            questionToSave.LastUpdateDate = questionToSave.DateCreated = DateTime.Now;
            questionToSave.LastUpdateByDisplayName =
                questionToSave.CreatedByDisplayName = Utils.FormatFullName(user.FirstName, user.LastName);

            Question question = Mapper.Map<QuestionDto, Question>(questionToSave);

            // Initialize properties which are not in the dto
            question.CreatedBy = question.LastUpdateBy = user.Id;
            question.RankSum = 0;

            // Initialize MatchingVector
            question = InitializeMatchingVector(question);

            // save in db
            base.Add(question);
            _context.SaveChanges();

            return Mapper.Map<Question, QuestionDto>(question);
        }

        private Question InitializeMatchingVector(Question question)
        {
            int length = (int)MatchingVectorIndex.StartOfSkills;
            int[] zeroes = new int[length];
            question.MatchingVector = Utils.ConvertListIdsToString(zeroes.ToList());

            question.MatchingVector = String.Concat(question.MatchingVector, ',', question.TestedSkills);

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

        public QuestionDto IncludeSkills(QuestionDto q)
        {
            var skills = new SkillsRepository(_context).GetAll();
            var skillDtos = Mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(skills);

            var ids = Utils.ConvertStringIdsToList(q.TestedSkills);
            var relevantSkills =
                q.Skills = skillDtos.Join(ids, s => s.Id, id => id, (s, id) => s);
            
            return q;
        }

        public void IncrementSolvedCount(int questionId)
        {
            Question q = base.Get(questionId);
            ++q.SolvedCount;
            _context.SaveChanges();
        }

        public void UpdateRank(int questionId, double rank)
        {
            Question q = base.Get(questionId);
            q.RankSum += rank;
            ++q.RankedCount;
            q.Rank = Math.Round(q.RankSum / q.RankedCount, 5);
            _context.SaveChanges();
        }
    }
}