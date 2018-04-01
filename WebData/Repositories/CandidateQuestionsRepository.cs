
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebData.Data;
using WebData.Dtos;
using WebData.HelperModels;
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

        public CandidateQuestionDto UpdateQuestionSolution(SolutionQuestionData solutionData, int candidateId)
        {
            var candidateQuestion = base.GetSingleOrDefault(cq => cq.CandidateUserId == candidateId && cq.QuestionId == solutionData.QuestionId);
            if(candidateQuestion == null)
            {
                throw new Exception($"CandidateQuestion with qId {solutionData.QuestionId}, candidateId {candidateId} wasn't found");
            }
            candidateQuestion.Solution = solutionData.Solution;
            candidateQuestion.IsDone = true;
            base.Update(candidateQuestion);
            _context.SaveChanges();
            return Mapper.Map<CandidateQuestionDto>(candidateQuestion);
        }
    }
}