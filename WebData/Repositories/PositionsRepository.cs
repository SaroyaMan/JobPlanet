using WebData.IdentityModels;
using AutoMapper;
using WebData.Data;
using Microsoft.EntityFrameworkCore;
using WebData.Dtos;
using System;
using WebData.Repositories.Interfaces;

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
    }
}