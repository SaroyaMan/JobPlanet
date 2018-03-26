using Microsoft.AspNetCore.Http;

namespace WebData.Dtos
{
    public class AttachmentDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] FileContent { get; set; }
        public string FileType { get; set; }
        public int RefObjectType { get; set; }
        public int RefObjectId { get; set; }
    }
}