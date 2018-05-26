using WebData.IdentityModels;
using AutoMapper;
using WebData.Data;
using Microsoft.EntityFrameworkCore;
using WebData.Dtos;
using System;
using WebData.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace WebData.Repositories
{
    public class PositionsRepository: Repository<Position>, IPositionsRepository
    {

        public PositionsRepository(DbContext context) : base(context) { }

        public PositionDto SavePosition(PositionDto positionToSave, AppUser user)
        {
            positionToSave.LastUpdateDate = positionToSave.DateCreated = DateTime.Now;
            positionToSave.LastUpdateByDisplayName =
                positionToSave.CreatedByDisplayName = Utils.FormatFullName(user.FirstName, user.LastName);

            Position position = Mapper.Map<PositionDto, Position>(positionToSave);

            // Initialize properties which are not in the dto
            position.CreatedBy = position.LastUpdateBy = user.Id;

            // save in db
            base.Add(position);
            _context.SaveChanges();

            return Mapper.Map<PositionDto>(position);
        }

        public IEnumerable<PositionDto> IncludeSkills(IEnumerable<PositionDto> positionDtos)
        {
            var skills = new SkillsRepository(_context).GetAll();
            var skillDtos = Mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(skills);
            foreach (PositionDto p in positionDtos)
            {
                var ids = Utils.ConvertStringIdsToList(p.RequiredSkills);
                var requiredSkills = p.Skills = skillDtos.Join(ids, s => s.Id, id => id, (s, id) => s);
            }
            return positionDtos;
        }

        public PositionDto IncludeSkills(PositionDto p)
        {
            var skills = new SkillsRepository(_context).GetAll();
            var skillDtos = Mapper.Map<IEnumerable<Skill>, IEnumerable<SkillDto>>(skills);

            var ids = Utils.ConvertStringIdsToList(p.RequiredSkills);
            var requiredSkills =
                p.Skills = skillDtos.Join(ids, s => s.Id, id => id, (s, id) => s);
            
            return p;
        }

        public PositionDto GetFullPositionData(string userId, int positionId)
        {
            var position = _entities.Include(p => p.Tests).Include(p => p.PotentialCandidates).SingleOrDefault(p => p.CreatedBy.Equals(userId) && p.Id == positionId);

            PositionDto result = null;
            if(position != null)
            {
                foreach(Test test in position.Tests)
                {
                    test.QuestionTests = _context.Set<QuestionTest>()
                        .Where(qt => qt.TestId == test.Id)
                        .Include(t => t.Question).ToList();
                }


                result = Mapper.Map<PositionDto>(position);
                result = IncludeSkills(result);
            }
            return result;
        }
    }
}