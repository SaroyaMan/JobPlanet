using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;
using System.Linq;

namespace WebData.Repositories
{
    public class SkillsRepository: Repository<Skill>, ISkillsRepository
    {

        public SkillsRepository(DbContext context) : base(context) { }


        public IEnumerable<Skill> GetSkillsByCategoryId(int categoryId)
        {
            return base.Find(s => s.SkillCategoryId == categoryId);
        }

        public IEnumerable<SkillCategory> GetSkillsCategories()
        {

            return _context.Set<SkillCategory>().Include(sc => sc.Skills).ToList();
        }

        public IEnumerable<Skill> GetSkillsByIds(List<int> ids)
        {
            return base.GetAll().Join(ids, s => s.Id, id => id, (s, id) => s);
        }
    }
}