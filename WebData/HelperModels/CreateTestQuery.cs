using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebData.HelperModels
{
    public class CreateTestQuery
    {
        public List<int> SkillIds { get; set; }
        public int DifficultyLevel { get; set; }
        public int TimeFrame { get; set; }
    }
}
