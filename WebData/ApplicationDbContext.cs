using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using WebData.Data;
using WebData.IdentityModels;

namespace WebData {
    public class ApplicationDbContext: IdentityDbContext<AppUser> {
        public ApplicationDbContext(DbContextOptions options)
            : base(options) { }

        public string CurrentUserId { get; set; }
        public DbSet<WebData.IdentityModels.Candidate> Candidates { get; set; }
        public DbSet<Skill> Skills { get; set; }



        public override int SaveChanges() {
            return base.SaveChanges();
        }


        public override int SaveChanges(bool acceptAllChangesOnSuccess) {
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken)) {
            return base.SaveChangesAsync(cancellationToken);
        }


        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken)) {
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}
