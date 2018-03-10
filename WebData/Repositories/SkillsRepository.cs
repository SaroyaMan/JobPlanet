using Microsoft.EntityFrameworkCore;
using WebData.Data;

namespace WebData.Repositories {
    public class SkillsRepository: Repository<Skill> {

        public SkillsRepository(DbContext context) : base(context) { }
    }

    //private ApplicationDbContext _appContext => (ApplicationDbContext) _context;

}