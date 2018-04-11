using System;
using System.Collections;
using System.Collections.Generic;
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

        [HttpGet]
        public IEnumerable<PositionDto> Get()
        {
            // Receive positions which created by recruiter who sent the request
            IEnumerable<PositionDto> results = null;

            try
            {
                var repository = new PositionsRepository(_appDbContext);
                var relevantPositions = repository.Find(p => p.CreatedBy.Equals(_clientData.Id));
                results = _mapper.Map<IEnumerable<Position>, IEnumerable<PositionDto>>(relevantPositions);
                results = repository.IncludeSkills(results);
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error getting relevant positions");
            }
            return results;
        }

        [HttpGet("getPositionById")]
        public PositionDto GetPositionById(int positionId)
        {
            PositionDto result = null;

            try
            {
                var repository = new PositionsRepository(_appDbContext);
                result = repository.GetFullPositionData(_clientData.Id, positionId);/* repository.GetSingleOrDefault(p => p.CreatedBy.Equals(_clientData.Id) && p.Id == positionId);*/
            }
            catch(Exception e)
            {
                _log.LogError(e, $"Error getting position {positionId}");
            }
            return result;
        }


        [HttpPost("publishPosition")]
        public PositionDto PublishPosition([FromBody] PositionDto positionDto)
        {
            PositionDto savedPosition = null;
            try
            {
                var repository = new PositionsRepository(_appDbContext);
                savedPosition = repository.SavePosition(positionDto, _clientData);
                savedPosition = repository.IncludeSkills(savedPosition);
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