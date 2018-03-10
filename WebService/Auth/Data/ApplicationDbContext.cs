using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading;
using System.Threading.Tasks;
using WebData.Data;
using WebService.Auth.Models;

namespace WebService.Auth.Data
{
    public class ApplicationDbContext: IdentityDbContext<AppUser> {
        public ApplicationDbContext(DbContextOptions options)
            : base(options) {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            base.OnConfiguring(optionsBuilder);
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
            //optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }

        public string CurrentUserId { get; set; }
        public DbSet<Models.Candidate> Candidates { get; set; }
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
