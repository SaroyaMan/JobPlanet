
using System;
using System.Collections.Generic;
using WebData.ConstValues;
using WebData.Data;

namespace WebData.Dtos
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DateCreated { get; set; }
        public string CreatedByDisplayName { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        //public string LastUpdateBy { get; set; }
        //public string CreatedBy { get; set; }
        public string LastUpdateByDisplayName { get; set; }
        public double Rank { get; set; }
        //public double RankSum { get; set; }
        public int RankedCount { get; set; }
        public int AccessModifier { get; set; }
        public int SolvedCount { get; set; }
        public string TestedSkills { get; set; }
        public int? QuestionState { get; set; }
        public double? MatchingDistance { get; set; }

        public IEnumerable<SkillDto> Skills { get; set; }

        public IEnumerable<TestQuestionDto> QuestionTests { get; set; }
    }
}