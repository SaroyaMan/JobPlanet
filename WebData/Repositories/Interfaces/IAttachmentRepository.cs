
using Microsoft.AspNetCore.Http;
using WebData.Data;
using WebData.Dtos;

namespace WebData.Repositories.Interfaces
{
    public interface IAttachmentsRepository: IRepository<Attachment>
    {
        AttachmentDto GetDetails(int objectType, int objectId);

        void Upload(int objectType, int objectId, IFormFile file, byte[] fileContent);
    }
}
