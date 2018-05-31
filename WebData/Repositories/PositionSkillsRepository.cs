using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;
using System.Linq;
using WebData.Dtos;

namespace WebData.Repositories
{
    public class PositionSkillsRepository: Repository<PositionSkill>, IPositionSkillsRepository
    {

        public PositionSkillsRepository(DbContext context) : base(context) { }

        public void Add(int positionId, IEnumerable<PositionSkillDto> positionSkillDtos)
        {
            List<PositionSkill> positionSkillsToDb = new List<PositionSkill>();

            foreach (var positionSkill in positionSkillDtos)
            {
                var ps = new PositionSkill
                {
                    PositionId = positionId,
                    SkillId = positionSkill.SkillId,
                    SkillWeight = positionSkill.SkillWeight / 10
                };

                positionSkillsToDb.Add(ps);
            }

            _context.AddRange(positionSkillsToDb);
            _context.SaveChanges();
        }
    }
}