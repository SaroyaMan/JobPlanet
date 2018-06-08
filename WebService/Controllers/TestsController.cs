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
            catch (Exception e)
            {
                _log.LogError(e, "Error saving Test");
            }

            return savedTest;
        }

        [HttpPost("createTestSolution")]
        public TestSolutionDto CreateTestSolution([FromBody] TestSolutionDto testSolutionDto)
        {
            TestSolutionDto savedTestSolution = null;
            try
            {
                savedTestSolution = new TestSolutionsRepository(_appDbContext).SaveTestSolution(testSolutionDto);
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error saving Test Solution");
            }
            return savedTestSolution;
        }

        [HttpPost("saveTestSolutionFeedback")]
        public TestSolutionDto SaveTestSolutionFeedback([FromBody] TestSolutionDto testSolution)
        {
            try
            {
                if (!ModelState.IsValid || testSolution.TestSolutionQuestions.Count() == 0)
                {
                    throw new Exception();
                }

                TestSolutionDto testSolutionDto = new TestSolutionsRepository(_appDbContext).SaveFeedback(testSolution);

                return testSolutionDto;
            }
            catch(Exception e)
            {
                _log.LogError(e, "Error saving TestSolutionQuestions");
                return null;
            }
        }
    }
}