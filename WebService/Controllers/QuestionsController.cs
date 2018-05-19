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
using System.Linq;
using WebData.ConstValues;
using WebData.Repositories.Interfaces;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class QuestionsController: BaseController<QuestionsController>
    {

        public QuestionsController(ApplicationDbContext appDbContext, IMapper mapper,
            ILogger<QuestionsController> log, IHttpContextAccessor httpContextAccessor) : base(appDbContext, mapper, log, httpContextAccessor)
        {
        }

        [HttpGet]
        public IEnumerable<QuestionDto> Get()
        {

            IEnumerable<QuestionDto> results = null;

            try
            {
                var allQuestions = new QuestionsRepository(_appDbContext).GetAll();
                results = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(allQuestions);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error getting all questions");
            }
            return results;
        }

        [HttpGet("internalQuestions")]
        public IEnumerable<QuestionDto> GetInternalQuestions()
        {
            IEnumerable<QuestionDto> results = null;
            try
            {
                QuestionsRepository repository = new QuestionsRepository(_appDbContext);

                var questions = repository.Find(p => 
                        p.CreatedBy == _clientData.Id && 
                        p.AccessModifier != (int)AccessModifier.Public);

                var questionDtos = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(questions);
                results = repository.IncludeSkills(questionDtos);
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error getting internal questions");
            }
            return results;
        }

        [HttpGet("publishedQuestions")]
        public IEnumerable<QuestionDto> GetPublishedQuestions()
        {
            IEnumerable<QuestionDto> results = null;
            try
            {
                QuestionsRepository repository = new QuestionsRepository(_appDbContext);
                var questions = repository.Find(p => p.CreatedBy == _clientData.Id);
                var questionDtos = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(questions);
                results = repository.IncludeSkills(questionDtos);

            }
            catch(Exception e)
            {
                _log.LogError(e, "Error getting published questions");
            }
            return results;
        }

        [HttpPost("publishQuestion")]
        public QuestionDto PublishQuestion([FromBody] QuestionDto questionDto)
        {
            QuestionDto savedQuestion = null;

            try
            {
                var repository = new QuestionsRepository(_appDbContext);
                savedQuestion = repository.SaveOrUpdateQuestion(questionDto, _clientData);
                savedQuestion = repository.IncludeSkills(savedQuestion);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error publishing question");
            }

            return savedQuestion;
        }

        [HttpPost("searchQuestions")]
        public IEnumerable<QuestionDto> SearchQuestions([FromBody] SearchQuestionsQuery query)
        {

            IEnumerable<QuestionDto> results = null;

            try
            {
                QuestionsRepository repository = new QuestionsRepository(_appDbContext);
                
                var questionDtos = repository.GetQuestionsByQuery(query, _clientData);

                results = repository.IncludeSkills(questionDtos);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error searching questions");
            }

            return results;
        }

        [HttpPost("SearchQuestionsForTest")]
        public IEnumerable<QuestionDto> SearchQuestionsForTest([FromBody] CreateTestQuery query)
        {

            IEnumerable<QuestionDto> results = null;

            try
            {
                QuestionsRepository repository = new QuestionsRepository(_appDbContext);

                var questionDtos = repository.GetQuestionsForTest(query, _clientData.Id);

                results = repository.IncludeSkills(questionDtos);
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error searching questions for test");
            }

            return results;
        }

        [HttpPost("addToTodoList/{questionId}")]
        public IActionResult AddToTodoList(int questionId)
        {
            try
            {
                CandidateQuestionsRepository repository = new CandidateQuestionsRepository(_appDbContext);
                repository.Add(_clientData.ChildId, questionId);
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error adding to todo list");
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [HttpDelete("removeFromTodoList/{questionId}")]
        public IActionResult RemoveFromTodoList(int questionId)
        {
            try
            {
                CandidateQuestionsRepository repository = new CandidateQuestionsRepository(_appDbContext);
                repository.Remove(_clientData.ChildId, questionId);
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error removing from todo list");
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [HttpGet("myQuestions/{isDone}")]
        public IEnumerable<QuestionDto> GetDoneOrTodoList(bool isDone)
        {
            IEnumerable<QuestionDto> results = null;
            List<Question> doneOrTodoList = null;

            try
            {
                CandidateQuestionsRepository repository = new CandidateQuestionsRepository(_appDbContext);
                var candidateQuestions = repository.Get(isDone, _clientData.ChildId);

                doneOrTodoList = candidateQuestions.Select(q => q.Question).ToList();

                results = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(doneOrTodoList);

                results = new QuestionsRepository(_appDbContext).IncludeSkills(results);
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error getting done/todo list");
            }

            return results;
        }

        [HttpGet("candidateQuestion/{questionId}")]
        public CandidateQuestionDto GetCandidateQuestion(int questionId)
        {
            CandidateQuestionDto result = null;

            try
            {
                CandidateQuestionsRepository repository = new CandidateQuestionsRepository(_appDbContext);
                var candidateQuestion = repository.GetSingleOrDefault(cq => cq.QuestionId == questionId && cq.CandidateUserId == _clientData.ChildId);
                if(candidateQuestion != null)
                {
                    result = _mapper.Map<CandidateQuestionDto>(candidateQuestion);
                }

            }
            catch(Exception e)
            {
                _log.LogError(e, "Error getting candidate question");
            }

            return result;
        }

        [HttpPatch("postSolution")]
        public CandidateQuestionDto PostSolution([FromBody] SolutionQuestionData obj)
        {
            CandidateQuestionDto result = null;
            try
            {
                // Post the question solution
                CandidateQuestionsRepository cqRepository = new CandidateQuestionsRepository(_appDbContext);
                result = cqRepository.UpdateQuestionSolution(obj, _clientData.ChildId);

                // Increment number of solves count
                QuestionsRepository questionsRepository = new QuestionsRepository(_appDbContext);
                questionsRepository.IncrementSolvedCount(obj.QuestionId);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error posting the solution");
            }
            return result;
        }

        [HttpPatch("postReview")]
        public CandidateQuestionDto PostReview([FromBody] ReviewQuestionData obj)
        {
            CandidateQuestionDto result = null;
            try
            {
                // Post the question review
                CandidateQuestionsRepository cqRepository = new CandidateQuestionsRepository(_appDbContext);
                result = cqRepository.UpdateQuestionReview(obj, _clientData.ChildId);

                // Update the Rank of the question
                QuestionsRepository questionsRepository = new QuestionsRepository(_appDbContext);
                questionsRepository.UpdateRank(obj.QuestionId, obj.Rank);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error posting the review");
            }
            return result;
        }

        [HttpGet("questionStatistics")]
        public IEnumerable<CandidateQuestionDto> GetQuestionStatistics(int questionId)
        {
            IEnumerable<CandidateQuestionDto> result = null;

            try
            {
                CandidateQuestionsRepository repository = new CandidateQuestionsRepository(_appDbContext);

                var candidateQuestions = repository.Find(cq => 
                    cq.QuestionId == questionId && 
                    cq.CandidateUserId != _clientData.ChildId &&
                    cq.IsDone == true &&
                    (cq.Solution != null || cq.Ranked != null));

                if (candidateQuestions != null)
                {
                    result = _mapper.Map<IEnumerable<CandidateQuestionDto>>(candidateQuestions);
                }
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error getting candidate question");
            }
            return result;
        }
    }
}