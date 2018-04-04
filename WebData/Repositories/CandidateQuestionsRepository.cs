
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

        public void Remove(int candidateId, int questionId)
        {
            CandidateQuestion questionToDelete = _entities.FirstOrDefault(cq => cq.QuestionId == questionId && cq.CandidateUserId == candidateId);

            _context.Remove(questionToDelete);

            _context.SaveChanges();
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
            bool isNew = false;

            if(candidateQuestion == null)
            {
                candidateQuestion = new CandidateQuestion()
                {
                    CandidateUserId = candidateId,
                    QuestionId = solutionData.QuestionId,
                };
                isNew = true;
            }

            candidateQuestion.Solution = solutionData.Solution;
            candidateQuestion.SolutionDate = DateTime.Now;
            candidateQuestion.IsDone = true;

            if(isNew)
            {
                base.Add(candidateQuestion);
            }
            else
            {
                base.Update(candidateQuestion);
            }

            _context.SaveChanges();
            return Mapper.Map<CandidateQuestionDto>(candidateQuestion);
        }

        public CandidateQuestionDto UpdateQuestionReview(ReviewQuestionData reviewData, int candidateId)
        {
            var candidateQuestion = base.GetSingleOrDefault(cq => cq.IsDone && cq.CandidateUserId == candidateId && cq.QuestionId == reviewData.QuestionId);
            if(candidateQuestion == null)
            {
                throw new Exception($"Question {reviewData.QuestionId} with CandidateId {candidateId} was not found");
            }
            candidateQuestion.Review = reviewData.Review;
            candidateQuestion.Ranked = reviewData.Rank;
            base.Update(candidateQuestion);
            _context.SaveChanges();
            return Mapper.Map<CandidateQuestionDto>(candidateQuestion);
        }
    }
}