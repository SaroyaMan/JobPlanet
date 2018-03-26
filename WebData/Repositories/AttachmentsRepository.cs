
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Repositories.Interfaces;

namespace WebData.Repositories
{
    public class AttachmentsRepository: Repository<Attachment>, IAttachmentsRepository
    {
        public AttachmentsRepository(DbContext context) : base(context)
        {
        }
    }
}