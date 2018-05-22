
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.Dtos;
using WebData.Repositories.Interfaces;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System;

namespace WebData.Repositories
{
    public class AttachmentsRepository: Repository<Attachment>, IAttachmentsRepository
    {
        public AttachmentsRepository(DbContext context) : base(context)
        {
        }

        public AttachmentDto GetDetails(int objectType, int objectId)
        {
            return _entities.Where(a => a.RefObjectType == objectType && a.RefObjectId == objectId)
                    ?.Select(a => new AttachmentDto
                    {
                        FileName = a.FileName,
                        FileType = a.FileType,
                        RefObjectId = a.RefObjectId,
                        RefObjectType = a.RefObjectType,
                        DateCreated = a.DateCreated,
                        LastUpdateDate = a.LastUpdateDate,
                    }).Single();
        }

        public void Upload(int objectType, int objectId, IFormFile file, byte[] fileContent)
        {
            var attachment = _entities.SingleOrDefault(a => a.RefObjectType == objectType && a.RefObjectId == objectId);

            if (attachment != null)
            {
                _context.Attach(attachment);
                attachment.FileName = file.FileName;
                attachment.FileContent = fileContent;
                attachment.FileType = file.ContentType;
                attachment.LastUpdateDate = DateTime.Now;
            }
            else
            {
                attachment = new Attachment
                {
                    FileName = file.FileName,
                    FileContent = fileContent,
                    RefObjectType = objectType,
                    RefObjectId = objectId,
                    FileType = file.ContentType,
                    DateCreated = DateTime.Now,
                    LastUpdateDate = DateTime.Now,
                };
                _context.Add(attachment);
            }

            _context.SaveChanges();
        }
    }
}