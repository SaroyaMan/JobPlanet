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
    public class TestsController: BaseController<TestsController>
    {

        public TestsController(ApplicationDbContext appDbContext, IMapper mapper,
            ILogger<TestsController> log, IHttpContextAccessor httpContextAccessor) : base(appDbContext, mapper, log, httpContextAccessor)
        {
        }

        [HttpPost("createTest")]
        public TestDto CreateTest([FromBody] TestDto testDto)
        {
            TestDto savedTest = null;
            try
            {
                savedTest = new TestsRepository(_appDbContext).Add(testDto, _clientData);
            }
            catch(Exception e)
            {
                // remove saved test ?
                _log.LogError(e, "Error saving Test");
                return null;
            }
            return savedTest;
        }
    }
}