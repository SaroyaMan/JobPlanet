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
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Data.Entity;

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

        [HttpPost("upload/{objectType}/{objectId?}")]
        public IActionResult Upload(int objectType, int? objectId)
        {
            try
            {
                if(Request.Form.Files.Count > 0)
                {
                    IFormFile file = Request.Form.Files.First();
                    if(file == null || file.Length == 0) throw new Exception("File is empty");

                    var attachmentsRepository = new AttachmentsRepository(_appDbContext);

                    if (objectId == null)
                    {
                        objectId = _clientData.ChildId;
                    }

                    using (var binaryReader = new BinaryReader(file.OpenReadStream()))
                    {
                        byte[] fileContent = binaryReader.ReadBytes((int) file.Length);

                        attachmentsRepository.Upload(objectType, (int) objectId, file, fileContent);
                    }
                }
            }
            catch(Exception e)
            {
                _log.LogError(e.Message);
                return BadRequest(e.Message);
            }
            return Ok();
        }

        [HttpGet("download/{objectType}/{objectId?}")]
        public IActionResult Download(int objectType, int? objectId)
        {
            try
            {
                if(objectId == null)
                {
                    objectId = _clientData.ChildId;
                }

                var attachment = new AttachmentsRepository(_appDbContext).GetSingleOrDefault(a => a.RefObjectType == objectType && a.RefObjectId == objectId);

                if (attachment == null)
                {
                    return Ok();
                }

                byte[] fileContent = attachment.FileContent;

                return File(fileContent, attachment.FileType, attachment.FileName);
            }
            catch(Exception e)
            {
                _log.LogError(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpGet("details/{objectType}/{objectId?}")]
        public AttachmentDto Details(int objectType, int? objectId)
        {
            AttachmentDto attachment = null;

            try
            {
                if (objectId == null)
                {
                    objectId = _clientData.ChildId;
                }

                attachment = new AttachmentsRepository(_appDbContext).GetDetails(objectType, (int)objectId);
            }
            catch (Exception e)
            {
                _log.LogError(e.Message);
            }

            return attachment;
        }

        [HttpDelete("remove/{objectType}/{objectId?}")]
        public IActionResult Remove(int objectType, int? objectId)
        {
            try
            {
                int updatedObjectId = objectId ?? _clientData.ChildId;
                new AttachmentsRepository(_appDbContext).RemoveAttachmentByTypeAndId(objectType, updatedObjectId);
            }
            catch(Exception e)
            {
                _log.LogError(e.Message);
                return BadRequest(e.Message);
            }
            return Ok();
        }
    }
}