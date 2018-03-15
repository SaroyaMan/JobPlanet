using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebData;
using WebData.Data;
using WebData.Repositories;
using System.Linq;
using System.Linq.Expressions;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    public class SkillsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;

        public SkillsController(ApplicationDbContext appDbContext) {
            _appDbContext = appDbContext;

        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Skill> Get()
        {
            return new SkillsRepository(_appDbContext).GetAll();
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
