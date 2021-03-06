﻿using System.Collections.Generic;
using WebData.Data;
using WebData.Dtos;
using WebData.HelperModels;

namespace WebData.Repositories.Interfaces
{
    public interface ICandidateQuestionsRepository: IRepository<CandidateQuestion>
    {
        CandidateQuestion Add(int candidateId, int questionId);
        void Remove(int candidateId, int questionId);
        IEnumerable<CandidateQuestion> Get(bool isDone, int candidateId);
        CandidateQuestionDto UpdateQuestionSolution(SolutionQuestionData solutionData, int candidateId);
        CandidateQuestionDto UpdateQuestionReview(ReviewQuestionData reviewData, int candidateId);
    }
}