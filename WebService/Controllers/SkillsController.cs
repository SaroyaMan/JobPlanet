using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebData;
using WebData.Data;
using WebData.Repositories;
using AutoMapper;
using WebData.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class SkillsController : BaseController<SkillsController>
    {

        public SkillsController(ApplicationDbContext appDbContext, IMapper mapper, ILogger<SkillsController> log,
            IHttpContextAccessor httpContextAccessor): base(appDbContext, mapper, log, httpContextAccessor) {

        }

        [HttpGet]
        public IEnumerable<SkillDto> Get()
        {
            IEnumerable<SkillDto> results = null;

            try {
                var allSkills = new SkillsRepository(_appDbContext).GetAll();
                results = _mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(allSkills);
            }
            catch(Exception e) {
                _log.LogError(e, "Error in Get()");
            }
            return results;
        }

        [HttpGet("getSkillsByCategoryId")]
        public IEnumerable<SkillDto> GetSkillsByCategoryId(int id) {

            IEnumerable<SkillDto> results = null;

            try {
                var relevantSkills = new SkillsRepository(_appDbContext).GetSkillsByCategoryId(id);
                results = _mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(relevantSkills);
            }
            catch(Exception e) {
                _log.LogError(e, "Error in GetSkillsByCategoryId");
            }
            return results;
        }

        [HttpGet("getAllCategories")]
        public IEnumerable<SkillCategoryDto> GetAllSkillsCategories() {

            IEnumerable<SkillCategoryDto> results = null;
            
            try {
                var categories = new SkillsRepository(_appDbContext).GetSkillsCategories();
                results = _mapper.Map<IEnumerable<SkillCategory>, IEnumerable<SkillCategoryDto>>(categories);
            }
            catch(Exception e) {
                _log.LogError(e, "Error in GetSkillsByCategoryId");
            }
            return results;

        }
    }
}