using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebData.Dtos
{
    public class PositionSkillDto
    {
        public int PositionId { get; set; }
        public int SkillId { get; set; }
        public double SkillWeight { get; set; }

        public SkillDto Skill { get; set; }
    }
}
