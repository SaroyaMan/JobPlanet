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
using WebData.ConstValues;

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
                candidateDashbaordData.TodoListQuestions = Mapper.Map<IEnumerable<QuestionDto>>(candidateQuestionsRepository.Get(false, _clientData.ChildId).Select(cq => cq.Question).Take(Consts.DASHBOARD_DATA_TODO_LIST_COUNT));
                candidateDashbaordData.PublishedQuestions = Mapper.Map<IEnumerable<QuestionDto>>(questionsRepository.Find(p => p.CreatedBy == _clientData.Id).Take(Consts.DASHBOARD_DATA_PUBLISHED_QUESTIONS_COUNT).OrderByDescending(q => q.DateCreated));

                candidateDashbaordData.TodoListQuestions = questionsRepository.IncludeSkills(candidateDashbaordData.TodoListQuestions);
                candidateDashbaordData.PublishedQuestions = questionsRepository.IncludeSkills(candidateDashbaordData.PublishedQuestions);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error in GetCandidateDashboardData()");
            }
            return candidateDashbaordData;
        }

        [HttpGet("recruiterDashboardData")]
        public RecruiterDashboardData GetRecruiterDashboardData()
        {
            var recruiterDashboardData = new RecruiterDashboardData();

            try
            {
                var positionsRepository = new PositionsRepository(_appDbContext);

                recruiterDashboardData.OpenPositions = positionsRepository.GetRecentOpenPositions(_clientData.Id);
                recruiterDashboardData.NumOfOpenPositions = positionsRepository.Find(p => p.CreatedBy == _clientData.Id && p.Status == (int) PositionStatus.Opened).Count();
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error in GetCandidateDashboardData()");
            }
            return recruiterDashboardData;
        }
    }
}