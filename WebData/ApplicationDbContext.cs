using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using WebData.Data;

namespace WebData {

    //public class ApplicationDbContext: IdentityDbContext<AppUser> {
    //    public ApplicationDbContext(DbContextOptions options)
    //        : base(options) { }

    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
    //        base.OnConfiguring(optionsBuilder);
    //        IConfigurationRoot configuration = new ConfigurationBuilder()
    //        .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    //        .AddJsonFile("appsettings.json")
    //        .Build();
    //        //optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
    //    }

    //    public DbSet<Candidate> Candidates { get; set; }
    //    public DbSet<Skill> Skills { get; set; }
    //    public string CurrentUserId { get; set; }
    //}
}
