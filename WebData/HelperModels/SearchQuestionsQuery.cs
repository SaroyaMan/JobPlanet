

using System.Collections.Generic;

namespace WebData.HelperModels
{
    public class SearchQuestionsQuery
    {

        public string Title { get; set; }
        public List<int> SkillIds { get; set; }
        public float? MinRank { get; set; }
        public float? MaxRank { get; set; }
    }
}