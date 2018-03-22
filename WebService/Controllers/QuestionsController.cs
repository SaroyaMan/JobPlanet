using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebData;
using WebData.Data;
using WebData.Dtos;
using WebData.HelperModels;
using WebData.Repositories;

namespace WebService.Controllers {
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class QuestionsController : Controller {

        private readonly ApplicationDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<QuestionsController> _log;

        public QuestionsController(ApplicationDbContext appDbContext, IMapper mapper, ILogger<QuestionsController> log) {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _log = log;
        }

        [HttpGet]
        public IEnumerable<QuestionDto> Get() {

            IEnumerable<QuestionDto> results = null;

            try {
                var allQuestions = new QuestionsRepository(_appDbContext).GetAll();
                results = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(allQuestions);
            }
            catch(Exception e) {
                _log.LogError(e.Message);
            }
            return results;
        }

        [HttpPost("searchQuestions")]
        public IEnumerable<QuestionDto> SearchQuestions([FromBody] SearchQuestionsQuery query) {

            IEnumerable<QuestionDto> results = null;

            try {
                var questions = new QuestionsRepository(_appDbContext).GetQuestionsByQuery(query);
                results = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(questions);
            }

            catch(Exception e) {
                _log.LogError(e.Message);
            }

            return results;
        }

    }
}