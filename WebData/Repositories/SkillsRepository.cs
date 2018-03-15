using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories {
    public class SkillsRepository: Repository<Skill>, ISkillsRepository {

        public SkillsRepository(DbContext context) : base(context) { }
    }

    //private ApplicationDbContext _appContext => (ApplicationDbContext) _context;

}