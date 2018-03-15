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

namespace WebService.Controllers
{
    [Route("api/[controller]")]
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

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
