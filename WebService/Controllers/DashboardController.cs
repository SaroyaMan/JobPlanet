using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using WebData;
using WebData.Dtos;
using WebData.HelperModels;
using WebData.Repositories;
using System.Linq;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class DashboardController: BaseController<DashboardController>
    {
        public DashboardController(ApplicationDbContext appDbContext, IMapper mapper,
            ILogger<DashboardController> log, IHttpContextAccessor httpContextAccessor) : base(appDbContext, mapper, log, httpContextAccessor)
        {
        }

        [HttpGet("candidateDashboardData")]
        public CandidateDashboardData GetCandidateDashboardData()
        {
            var candidateDashbaordData = new CandidateDashboardData();

            try
            {
                var questionsRepository = new QuestionsRepository(_appDbContext);
                var candidateQuestionsRepository = new CandidateQuestionsRepository(_appDbContext);

                candidateDashbaordData.NumOfQuestions = questionsRepository.GetPublicQuestionsCount();
                candidateDashbaordData.TodoListQuestions = Mapper.Map<IEnumerable<CandidateQuestionDto>>(candidateQuestionsRepository.Get(false, _clientData.ChildId).Take(5));
                candidateDashbaordData.PublishedQuestions = Mapper.Map<IEnumerable<QuestionDto>>(questionsRepository.Find(p => p.CreatedBy == _clientData.Id).Take(10).OrderBy(q => q.DateCreated).Reverse());
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error in GetCandidateDashboardData()");
            }
            return candidateDashbaordData;
        }
    }
}