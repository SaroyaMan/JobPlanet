using System;
using System.Collections.Generic;

namespace WebData.Dtos
{
    public class TestDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Difficulty { get; set; }
        public int TimeFrameInMinutes { get; set; }
        public int MaxQuestions { get; set; }
        public string FocusedSkills { get; set; }
        public DateTime DateCreated { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByDisplayName { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public string LastUpdateBy { get; set; }
        public string LastUpdateByDisplayName { get; set; }
        public int PositionId { get; set; }

        public virtual PositionDto Position { get; set; }
        public virtual IEnumerable<QuestionTestDto> QuestionTests { get; set; }
    }
}