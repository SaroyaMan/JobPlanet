using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebData.Data;
using WebData.IdentityModels;

namespace WebData
{
    public class ApplicationDbContext: IdentityDbContext<AppUser>
    {
        public static DbContextOptions options = null;

        public ApplicationDbContext(DbContextOptions options): base(options)
        {
            if(ApplicationDbContext.options == null) ApplicationDbContext.options = options;
        }


        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    base.OnModelCreating(builder);
        //    builder.Entity<AspNetUserLogin>().HasKey(m => m.ProviderKey);
        //    builder.Entity<AspNetUserLogin>().HasKey(m => m.LoginProvider);
        //}

        public DbSet<CandidateUser> Candidates { get; set; }
        public DbSet<RecruiterUser> Recruiters { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SkillCategory> SkillCategories { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<CandidateQuestion> CandidateQuestions { get; set; }

        public DbSet<QuestionTest> QuestionTests { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<CandidatePosition> CandidatePositions { get; set; }
        public DbSet<TestSolution> TestSolutions { get; set; }
        public DbSet<TestSolutionQuestion> TestSolutionQuestions { get; set; }
    }
}