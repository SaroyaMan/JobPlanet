using WebData.ConstValues;
using WebData.Data;
using WebData.Dtos;
using WebData.IdentityModels;

namespace WebData.Repositories.Interfaces
{
    public interface IPositionsRepository: IRepository<Position>
    {
        PositionDto SavePosition(PositionDto positionDto, AppUser clientData);
        PositionDto GetFullPositionData(string userId, int positionId);
        //PositionDto AddCandidateToPotentials(int positionId, int candidateId, CandidatePositionStatus status);
        PositionDto AddCandidateToPotentials(int positionId, int candidateId,
            CandidatePositionStatus status, string unregisteredUserFullName = "", string unregisteredEmail = "");
    }
}