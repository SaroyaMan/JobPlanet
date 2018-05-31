using System.Collections.Generic;
using WebData.Data;
using WebData.Dtos;

namespace WebData.Repositories.Interfaces
{
    public interface IPositionSkillsRepository: IRepository<PositionSkill>
    {

        void Add(int Id, IEnumerable<PositionSkillDto> positionSkills);
    }
}