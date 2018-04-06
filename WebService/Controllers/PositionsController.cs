using System;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebData;
using WebData.Data;
using WebData.Dtos;
using WebData.Repositories;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class PositionsController: BaseController<PositionsController>
    {
        public PositionsController(ApplicationDbContext appDbContext, IMapper mapper,
            ILogger<PositionsController> log, IHttpContextAccessor httpContextAccessor) : base(appDbContext, mapper, log, httpContextAccessor)
        {
        }

        //[HttpGet]
        //public IEnumerable<QuestionDto> Get()
        //{

        //    IEnumerable<QuestionDto> results = null;

        //    try
        //    {
        //        var allQuestions = new QuestionsRepository(_appDbContext).GetAll();
        //        results = _mapper.Map<IEnumerable<Question>, IEnumerable<QuestionDto>>(allQuestions);
        //    }
        //    catch (Exception e)
        //    {
        //        _log.LogError(e, "Error getting all questions");
        //    }
        //    return results;
        //}


        [HttpPost("publishPosition")]
        public PositionDto PublishPosition([FromBody] PositionDto positionDto)
        {
            PositionDto savedPosition = null;
            try
            {
                savedPosition = new PositionsRepository(_appDbContext).SavePosition(positionDto, _clientData);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error publishing position");
                return null;
            }
            return savedPosition;
        }

    }
}