
using System;

namespace WebData.Dtos
{
    public class SkillDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public string CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public string CreatedByDisplayName { get; set; }
        public int SkillCategoryId { get; set; }
    }
}