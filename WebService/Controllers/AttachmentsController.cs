using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebData;
using WebData.Data;
using WebData.Repositories;
using AutoMapper;
using WebData.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;

namespace WebService.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "ApiUser")]
    public class AttachmentsController: BaseController<AttachmentsController>
    {

        public AttachmentsController(ApplicationDbContext appDbContext, IMapper mapper, ILogger<AttachmentsController> log,
            IHttpContextAccessor httpContextAccessor) : base(appDbContext, mapper, log, httpContextAccessor)
        {

        }

        [HttpPost("upload/{objectType}/{objectId}")]
        public IActionResult Upload(int objectType, int objectId)
        {
            try
            {
                if(Request.Form.Files.Count > 0)
                {
                    IFormFile file = Request.Form.Files.First();
                    if(file == null || file.Length == 0) throw new Exception("File is empty");
                    using(var binaryReader = new BinaryReader(file.OpenReadStream()))
                    {
                        byte[] fileContent = binaryReader.ReadBytes((int) file.Length);

                        AttachmentDto attachmentDto = new AttachmentDto()
                        {
                            FileName = file.FileName,
                            FileContent = fileContent,
                            RefObjectType = objectType,
                            RefObjectId = objectId,
                            FileType = file.ContentType,
                        };
                        Attachment attachment = _mapper.Map<AttachmentDto, Attachment>(attachmentDto);
                        new AttachmentsRepository(_appDbContext).Add(attachment);
                        _appDbContext.SaveChanges();
                    }
                }
            }
            catch(Exception e)
            {
                _log.LogError(e.Message);
                return BadRequest(e);
            }
            return Ok();
        }
    }
}