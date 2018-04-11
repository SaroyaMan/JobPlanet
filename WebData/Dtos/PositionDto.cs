using System;
using System.Collections.Generic;

namespace WebData.Dtos
{
    public class PositionDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public string RequiredSkills { get; set; }
        public DateTime? DateCreated { get; set; }
        //public string CreatedBy { get; set; }
        public string CreatedByDisplayName { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        //public string LastUpdateBy { get; set; }
        public string LastUpdateByDisplayName { get; set; }

        public IEnumerable<CandidatePositionDto> PotentialCandidates { get; set; }
        public IEnumerable<SkillDto> Skills { get; set; }
        public IEnumerable<TestDto> Tests { get; set; }
    }
}