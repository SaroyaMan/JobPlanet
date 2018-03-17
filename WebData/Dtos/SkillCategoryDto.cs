
using System.Collections.Generic;

namespace WebData.Dtos {
    public class SkillCategoryDto {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<SkillDto> Skills { get; set; }
    }
}