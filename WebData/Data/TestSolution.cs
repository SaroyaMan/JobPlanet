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
    
    public partial class TestSolution
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TestSolution()
        {
            this.TestSolutionQuestions = new HashSet<TestSolutionQuestion>();
        }
    
        public int Id { get; set; }
        public int TestId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool IsMember { get; set; }
        public int TimeInSeconds { get; set; }
        public Nullable<int> CandidateUserId { get; set; }
        public System.DateTime DateCreated { get; set; }
        public bool IsEvaluated { get; set; }
    
        public virtual Test Test { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestSolutionQuestion> TestSolutionQuestions { get; set; }
    }
}
