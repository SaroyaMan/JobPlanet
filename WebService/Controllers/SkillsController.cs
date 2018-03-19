using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebData;
using WebData.Data;
using WebData.Repositories;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using WebData.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class SkillsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly IMapper _mapper;

        public SkillsController(ApplicationDbContext appDbContext, IMapper mapper) {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<SkillDto> Get()
        {
            var allSkills = new SkillsRepository(_appDbContext).GetAll();
            return _mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(allSkills);
        }

        [HttpGet("getSkillsByCategoryId")]
        public IEnumerable<SkillDto> GetSkillsByCategoryId(int id) {
            var relevantSkills = new SkillsRepository(_appDbContext).GetSkillsByCategoryId(id);
            return _mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(relevantSkills);
        }

        [HttpGet("getAllCategories")]
        public IEnumerable<SkillCategoryDto> GetAllSkillsCategories() {
            var categories = new SkillsRepository(_appDbContext).GetSkillsCategories();
            return _mapper.Map<IEnumerable<SkillCategory>, IEnumerable<SkillCategoryDto>>(categories);
        }
    }
}