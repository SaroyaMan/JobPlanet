using WebData.IdentityModels;
using AutoMapper;
using WebData.Data;
using Microsoft.EntityFrameworkCore;
using WebData.Dtos;
using System;
using WebData.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using WebData.ConstValues;

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

            new PositionSkillsRepository(_context).Add(position.Id, positionToSave.PositionSkills);

            positionToSave.Id = position.Id;
            return positionToSave;
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
            var position = _entities
                .Include("Tests.QuestionTests.Question")
                .Include("Tests.TestSolutions.TestSolutionQuestions")
                .Include(p => p.PotentialCandidates)
                .SingleOrDefault(p => p.CreatedBy.Equals(userId) && p.Id == positionId);

            PositionDto result = null;
            if(position != null)
            {
                result = Mapper.Map<PositionDto>(position);
                result = IncludeSkills(result);
            }
            return result;
        }

        public PositionDto AddCandidateToPotentials(int positionId, int candidateId,
            CandidatePositionStatus status, string unregisteredUserFullName = "", string unregisteredEmail = "")
        {
            PositionDto positionDto = null;
            CandidatePosition candidatePosition = null;

            string email = unregisteredEmail;
            string fullName = unregisteredUserFullName;

            if(candidateId != -1)
            {
                var candidates = _context.Set<CandidateUser>().Where(c => c.Id.Equals(candidateId))?.Include(c => c.Identity);
                if(candidates != null && candidates.Count() > 0)
                {
                    CandidateUser candidate = candidates.First();
                    fullName = $"{candidate.Identity.FirstName} {candidate.Identity.LastName}";
                    email = candidate.Identity.Email;
                }
            }

            candidatePosition = new CandidatePosition()
            {
                Email = email,
                FullName = fullName,
                PositionId = positionId,
                CandidateUserId = candidateId,
                Status = (int) status,
            };

            var positions = _entities.Where(p => p.Id == positionId)
                .Include(p => p.PotentialCandidates);
            if(positions != null && positions.Count() > 0)
            {
                var position = positions.First();
                position.PotentialCandidates.Add(candidatePosition);

                positionDto = Mapper.Map<PositionDto>(position);
            }
            return positionDto;
        }

        public IEnumerable<PositionDto> GetRecentOpenPositions(string userId)
        {
            IEnumerable<int> positionIds = _entities.Where(p => p.CreatedBy == userId).Select(p => p.Id);

            var latestPositions = _entities
                .Where(p => p.CreatedBy == userId && p.Status == (int) PositionStatus.Opened)
                .Include("Tests.QuestionTests.Question")
                .Include("Tests.TestSolutions.TestSolutionQuestions")
                .Include(p => p.PotentialCandidates)
                .OrderByDescending(p => p.DateCreated)
                .Take(Consts.DASHBOARD_DATA_OPEN_POSITIONS_COUNT)
                .ToList();


            IEnumerable<PositionDto> results = Mapper.Map<IEnumerable<PositionDto>>(latestPositions);

            results = IncludeSkills(results);

            return results;
        }
    }
}