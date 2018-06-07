//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebData.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Question
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Question()
        {
            this.Rank = 0D;
            this.RankSum = 0D;
            this.RankedCount = 0;
            this.AccessModifier = 3;
            this.CandidateQuestions = new HashSet<CandidateQuestion>();
            this.QuestionTests = new HashSet<TestQuestion>();
        }
    
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public System.DateTime DateCreated { get; set; }
        public string CreatedByDisplayName { get; set; }
        public System.DateTime LastUpdateDate { get; set; }
        public string LastUpdateBy { get; set; }
        public string LastUpdateByDisplayName { get; set; }
        public double Rank { get; set; }
        public double RankSum { get; set; }
        public int RankedCount { get; set; }
        public int AccessModifier { get; set; }
        public int SolvedCount { get; set; }
        public string TestedSkills { get; set; }
        public string CreatedBy { get; set; }
        public string MatchingVector { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CandidateQuestion> CandidateQuestions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestQuestion> QuestionTests { get; set; }
    }
}
