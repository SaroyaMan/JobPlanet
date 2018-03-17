using System.Collections.Generic;
using WebData.Data;

namespace WebData.Repositories.Interfaces {
    public interface ISkillsRepository: IRepository<Skill> {

        IEnumerable<Skill> GetSkillsByCategoryId(int categoryId);
        IEnumerable<SkillCategory> GetSkillsCategories();
    }
}