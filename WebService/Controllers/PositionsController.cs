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

            IEnumerable<PositionDto> results = null;

            try
            {
                var repository = new PositionsRepository(_appDbContext);

                var allPositions = repository.GetAll();

                results = _mapper.Map<IEnumerable<Position>, IEnumerable<PositionDto>>(allPositions);

                results = repository.IncludeSkills(results);
            }
            catch (Exception e)
            {
                _log.LogError(e, "Error getting all positions");
            }
            return results;
        }


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