﻿using System;
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
using Microsoft.Extensions.Logging;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class SkillsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly IMapper _mapper;
        readonly ILogger<SkillsController> _log;

        public SkillsController(ApplicationDbContext appDbContext, IMapper mapper, ILogger<SkillsController> log) {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _log = log;
        }

        // GET api/values
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