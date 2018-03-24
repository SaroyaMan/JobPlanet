using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class QuestionsController : BaseController<QuestionsController> {

        public QuestionsController(ApplicationDbContext appDbContext, IMapper mapper,
            ILogger<QuestionsController> log, IHttpContextAccessor httpContextAccessor): base(appDbContext, mapper, log, httpContextAccessor) {
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

        [HttpGet("publishedQuestions")]
        public IEnumerable<QuestionDto> GetPublishedQuestions() {

            string userId = null;
            IEnumerable<QuestionDto> results = null;

            if (_clientData == null)
            {
                _log.LogError("_clientData is null");
            }
            else
            {
                try
                {
                    userId = _clientData.Id;

                    var questions = new QuestionsRepository(_appDbContext).Find(p => p.CreatedBy == userId);
                    results = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(questions);
                }
                catch (Exception e)
                {
                    _log.LogError(e.Message);
                }
            }

            return results;
        }

        [HttpPost("publishQuestion")]
        public bool PublishQuestion([FromBody] QuestionDto questionDto)
        {

            if (_clientData == null)
            {
                _log.LogError("_clientData is null");
                return false;
            }

            // Initialize properties which should not be initialized in client
            questionDto.Id = 0;
            questionDto.LastUpdateDate = questionDto.DateCreated = DateTime.Now;
            questionDto.LastUpdateByDisplayName = 
                questionDto.CreatedByDisplayName = Utils.FormatFullName(_clientData.FirstName, _clientData.LastName);

            try
            {
                Question question = _mapper.Map<QuestionDto, Question>(questionDto);

                // Initialize properties which are not in the dto
                question.CreatedBy = question.LastUpdateBy = _clientData.Id;
                question.RankSum = 0;
                 
                // save in db
                new QuestionsRepository(_appDbContext).Add(question);
                _appDbContext.SaveChanges();
            }
            catch (Exception e)
            {
                _log.LogError(e.Message);
            }

            return true;
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